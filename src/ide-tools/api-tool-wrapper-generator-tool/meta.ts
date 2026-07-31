import type { IdeToolMeta } from "@/lib/ide-tool-types";

const API_TOOL_WRAPPER_PY = `"""
Example API tool wrapper: get_exchange_rate

This file shows ONE complete, runnable pattern for wrapping an external
HTTP API as a function an agent can call as a tool: a typed function
signature, authentication read from an environment variable rather than
hardcoded, the actual request call, status code handling, and a real error
case returned as structured data instead of an unhandled exception.

PLACEHOLDER API NOTICE: the endpoint below, https://api.example-exchange.com,
stands in for a real currency conversion API. Swap it, and the query
parameters it expects, for whatever real API this wrapper is actually meant
to call. Everything around the request itself, the authentication, the
timeout, the status handling and the error shape, stays the same regardless
of which real API replaces the placeholder.

LIBRARY NOTE: this example uses the requests library, the most common third
party HTTP client in Python and the one most agent tooling examples assume.
It is not part of the standard library and needs installing with
pip install requests. urllib.request from the standard library can do the
same job with no dependency at all; swap this import and the call below for
urllib if a dependency free wrapper is required instead.
"""

import os
from typing import TypedDict

import requests


class ExchangeRateResult(TypedDict, total=False):
    ok: bool
    from_currency: str
    to_currency: str
    amount: float
    converted_amount: float
    rate: float
    error: str


def get_exchange_rate(from_currency: str, to_currency: str, amount: float) -> ExchangeRateResult:
    """Convert an amount from one currency into another using a live exchange rate.

    Call this tool whenever a user asks what an amount in one currency is
    worth in another. Do not guess a conversion rate yourself; rates move
    daily and a guessed figure will be wrong.

    Args:
        from_currency: Three letter currency code the amount is currently
            in, for example "USD". Case insensitive.
        to_currency: Three letter currency code to convert the amount into,
            for example "EUR". Case insensitive.
        amount: The numeric amount to convert, expressed in from_currency.

    Returns:
        A dict. On success, ok is True and converted_amount and rate are
        set. On failure, ok is False and error explains what went wrong, in
        plain language safe to show to the calling model or a user.
    """
    # AUTHENTICATION: the key is read from an environment variable, never
    # written into this file. Set EXCHANGE_RATE_API_KEY in the environment
    # the process actually runs in before calling this function; a missing
    # key is treated as a normal, structured error rather than a crash.
    api_key = os.environ.get("EXCHANGE_RATE_API_KEY")
    if not api_key:
        return {
            "ok": False,
            "error": "Missing EXCHANGE_RATE_API_KEY environment variable. Set it before calling this tool.",
        }

    from_currency = from_currency.strip().upper()
    to_currency = to_currency.strip().upper()
    if len(from_currency) != 3 or len(to_currency) != 3:
        return {
            "ok": False,
            "error": f"from_currency and to_currency must be three letter codes, got {from_currency!r} and {to_currency!r}.",
        }
    if amount < 0:
        return {"ok": False, "error": f"amount must be zero or positive, got {amount}."}

    # PLACEHOLDER ENDPOINT: replace this URL and its query parameters with
    # the real API this wrapper is actually meant to call.
    url = "https://api.example-exchange.com/v1/convert"
    params = {"from": from_currency, "to": to_currency, "amount": amount}
    headers = {"Authorization": f"Bearer {api_key}"}

    try:
        # TIMEOUT: always set one. A wrapper with no timeout can hang the
        # calling agent indefinitely if the remote API never responds.
        response = requests.get(url, params=params, headers=headers, timeout=10)
    except requests.exceptions.Timeout:
        return {"ok": False, "error": "The exchange rate API did not respond within 10 seconds."}
    except requests.exceptions.ConnectionError as exc:
        return {"ok": False, "error": f"Could not reach the exchange rate API: {exc}"}
    except requests.exceptions.RequestException as exc:
        # CATCH ALL: any other network level failure the two cases above
        # did not name explicitly still comes back as structured data,
        # never as a raised exception the caller has to wrap in a try block.
        return {"ok": False, "error": f"Request to the exchange rate API failed: {exc}"}

    # STATUS HANDLING: a non 2xx response is not an exception in requests by
    # default, so it has to be checked for explicitly. Distinguishing a few
    # common cases gives the caller a clearer error than a bare status code.
    if response.status_code == 401:
        return {"ok": False, "error": "Authentication failed. Check that EXCHANGE_RATE_API_KEY is valid."}
    if response.status_code == 429:
        return {"ok": False, "error": "Rate limited by the exchange rate API. Wait and try again."}
    if response.status_code >= 500:
        return {"ok": False, "error": f"Exchange rate API server error, status {response.status_code}."}
    if response.status_code != 200:
        return {
            "ok": False,
            "error": f"Exchange rate API returned an unexpected status {response.status_code}: {response.text[:200]}",
        }

    try:
        payload = response.json()
    except ValueError:
        return {"ok": False, "error": "Exchange rate API returned a response that was not valid JSON."}

    # RESPONSE SHAPE: adapt this to whatever the real API actually returns.
    # The placeholder here assumes a rate field and a converted_amount field.
    rate = payload.get("rate")
    converted_amount = payload.get("converted_amount")
    if rate is None or converted_amount is None:
        return {"ok": False, "error": "Exchange rate API response was missing rate or converted_amount."}

    return {
        "ok": True,
        "from_currency": from_currency,
        "to_currency": to_currency,
        "amount": amount,
        "converted_amount": round(float(converted_amount), 2),
        "rate": float(rate),
    }


if __name__ == "__main__":
    # A quick manual check when running this file directly, not a test
    # suite. Set EXCHANGE_RATE_API_KEY in the environment first, then run
    # this file to see a real result printed to the terminal.
    result = get_exchange_rate("USD", "EUR", 100)
    print(result)
`;

const WRAPPER_CHECKLIST_MD = `# Checklist for wrapping any API safely

Use this checklist against api_tool_wrapper.py, or against any other API
wrapper you write, before handing the function to an agent as a callable
tool. Each item names a failure mode that shows up as a production incident
rather than a caught error when it is skipped, since a wrapper an agent
calls automatically has no person watching each individual call the way a
developer testing an API by hand would.

## Never hardcode a secret

An API key, token or password belongs in an environment variable read at
call time, never typed directly into the source file. A hardcoded secret
ends up in version control history the moment the file is committed, and
stays there even after it is later removed, since a git history rewrite is
rarely done in practice. Read it with os.environ.get, check that it is
actually present, and return a structured error naming the missing
variable rather than letting a later line fail with an unrelated exception.

## Always handle a non-2xx response

A library like requests does not raise an exception for a 404, a 429 or a
500 response by default; it returns that response object normally, with
the error status sitting in response.status_code waiting to be checked. A
wrapper that only checks the network layer and assumes any response that
arrives must be a success will happily parse an error page as though it
were real data. Check status_code explicitly, and where it is useful,
handle the common cases, authentication failure, rate limiting, and server
error, as distinct, differently worded errors rather than one generic
message.

## Always set a timeout

Every request call needs an explicit timeout. Without one, a remote API
that stops responding, rather than responding with an error, can hang the
calling process indefinitely, which for an agent waiting on the tool's
result means the entire run stalls with nothing to show for it. Ten seconds
is a reasonable default for a simple lookup; a slower or larger operation
should use a longer, still explicit, value rather than none at all.

## Return a structured error rather than raising

An unhandled exception crossing from inside a tool wrapper out to the
agent calling it is rarely handled gracefully on the other side; at best it
surfaces as an opaque stack trace, at worst it stops the whole run. Catch
the specific exceptions a network call can actually raise, a timeout, a
connection failure, an invalid JSON body, and return a small dict with an
ok flag and a plain language error field instead. That gives the calling
agent, or the code driving it, something predictable to branch on every
single time, success or failure alike.

## Validate input before sending the request

Check that required parameters look right, a three letter currency code, a
non-negative amount, before the request is ever sent. Catching a bad input
locally, with a clear structured error naming exactly what was wrong, is
faster and cheaper than sending a malformed request and parsing whatever
error the remote API happens to return for it.

## Keep the response shape consistent

Return the same dict shape, an ok flag plus either the real result fields
or an error field, on every path through the function. A caller checking
result["ok"] should never need a separate code path for one particular kind
of failure versus another; consistency here is what makes the wrapper safe
to call automatically rather than needing a person to read each result.
`;

const meta: IdeToolMeta = {
  slug: "api-tool-wrapper-generator-tool",
  title: "API Tool Wrapper Generator Tool: A Real Callable HTTP Wrapper",
  name: "API Tool Wrapper Generator",
  category: "tool-definition-tools",
  summary:
    "Open a real, runnable Python wrapper around an external HTTP API in an in-browser editor, complete with environment variable authentication, status handling and a structured error return, then rewrite it into your own tool.",
  seo: {
    primaryKeyword: "api tool wrapper generator tool",
    keywords: [
      "api tool wrapper generator tool",
      "wrap an api as an agent tool",
      "python api wrapper for ai agents",
      "api error handling for tool calls",
      "free api wrapper generator online",
    ],
    seoTitle: "API Tool Wrapper Generator Tool: A Real Callable Example",
    seoDescription:
      "A free api tool wrapper generator tool that opens a real Python HTTP wrapper in the browser, with env var auth, status handling and structured errors.",
  },
  files: [
    { path: "api_tool_wrapper.py", content: API_TOOL_WRAPPER_PY, kind: "code" },
    { path: "reference/wrapper-checklist.md", content: WRAPPER_CHECKLIST_MD, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the requests library's own documented behaviour for timeouts and non-2xx responses, and against the plain environment variable pattern most agent hosting environments already use for secrets.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to wrap an API from a blank prompt tend to write the happy path only: a request call with no timeout, no check on the response status code, and a bare return of response.json() that throws an unhandled exception the moment the remote API answers with anything other than a 200. A wrapper that checks status_code explicitly, catches the specific exceptions a network call can raise, and returns a structured ok and error shape on every path removes that gap before the function is ever called automatically by an agent with no person watching the individual call.",
  },
  article: {
    intro: [
      "This api tool wrapper generator tool opens a real, runnable Python file directly in your browser: api_tool_wrapper.py, a complete function that calls an external HTTP API, reads its authentication from an environment variable, checks the response status, and returns a real error case as structured data instead of letting an unhandled exception reach the agent calling it. Nothing here is a stub with the request call missing; it is a working currency conversion example, clearly marked where the placeholder API needs swapping for a real one.",
      "A wrapper is not a schema. This tool exists to wrap an api as an agent tool, meaning the executable code that reaches the network and decides what to do with the answer, not JSON that only describes that code afterward. Most of what makes a wrapper safe to call automatically lives in that decision: a timeout so a hung request cannot stall an agent run, a status check so an error page is never parsed as real data, and a structured error return so a failure is something the caller can branch on.",
      "Everything in the editor beside this article runs in the tab you are reading it in, so you can use this api tool wrapper generator tool without anything you type being uploaded anywhere. Editing the starter files, importing a .zip, and downloading the finished result all happen client side, which is what makes this a genuinely free api wrapper generator online rather than a signup gated service.",
    ],
    sections: [
      {
        heading: "What api_tool_wrapper.py actually contains",
        body: [
          "The starter file defines get_exchange_rate, a python api wrapper for ai agents that converts an amount from one currency into another by calling a placeholder exchange rate API over HTTP. It is a single, complete function rather than a class or a framework: a typed signature, a check for the authentication key, the request wrapped in a try block, explicit status code handling, and a final return of either a success result or a structured error.",
          "The example uses the requests library, noted in the file's own docstring as a third party dependency rather than something built into Python, alongside a pointer to urllib.request as the standard library alternative if a dependency free wrapper is required instead. Swapping one for the other changes only the request call itself; the authentication, timeout and error pattern around it stay the same.",
        ],
      },
      {
        heading: "Authentication belongs in an environment variable",
        body: [
          "The function reads its API key with os.environ.get, never as a literal string typed into the file. A missing key is checked for explicitly and returned as a structured error naming the exact variable that needs setting, rather than left to fail several lines later with an unrelated exception. This is the single most common defect a model asked to wrap an API from a blank prompt introduces: a hardcoded key that works during a quick test and then sits in version control history long after anyone remembers it is there.",
        ],
      },
      {
        heading: "Handling a response that is not a plain success",
        body: [
          "A request library does not raise an exception for a 404, a 429 or a 500 response by default; it hands back that response object exactly as received, with the failure sitting in response.status_code waiting to be checked. api_tool_wrapper.py checks that code explicitly, distinguishing an authentication failure, a rate limit and a server error before falling back to a generic unexpected status case for anything else.",
        ],
        list: [
          "A 401 response returns a message pointing at the authentication key specifically.",
          "A 429 response is named as a rate limit rather than a generic failure.",
          "Any status of 500 or above is reported as a server side error, not the caller's fault.",
        ],
      },
      {
        heading: "Why a timeout and a structured error both matter",
        body: [
          "Every request call in the starter file sets an explicit timeout. Without one, a remote API that stops responding can hang the calling process indefinitely, stalling the whole agent run. Each network level failure the request can raise is caught individually and returned as the same ok and error dict a successful call would return. The reference checklist extends this same api error handling for tool calls beyond this one example.",
        ],
      },
      {
        heading: "How this differs from a schema or an MCP tool definition",
        body: [
          "A function calling schema is a JSON description of a function's name, description and parameters, read by a model to decide whether and how to call something; it contains no executable logic at all. An MCP tool definition registers a Python function inside a Model Context Protocol server using a decorator, where the schema is generated from type hints. What this api tool wrapper generator tool builds is neither: it is the function body itself, the code that performs the HTTP call and hands back real data or a real, structured error.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import a .zip, reset the starter example, or download the current file set as a fresh archive. Importing reads a .zip entirely client side, with nothing about its contents ever leaving the browser tab.",
        ],
      },
    ],
    howTo: {
      name: "How to build your own API tool wrapper with this tool",
      steps: [
        { name: "Read api_tool_wrapper.py and the checklist together", text: "Open both starter files and read the comments beside the authentication check, the request call and the status handling before changing anything." },
        { name: "Swap the placeholder endpoint for a real one", text: "Replace the example URL and its query parameters with the real API this wrapper is actually meant to call." },
        { name: "Rename the function and its typed parameters", text: "Replace get_exchange_rate and its arguments with your own function's name and real, typed inputs." },
        { name: "Update the response parsing to match the real API", text: "Change the fields read from payload after response.json() to whatever the real API actually returns in its body." },
        { name: "Check the checklist item by item", text: "Confirm authentication still reads from an environment variable, a timeout is still set, and every path still returns the same ok and error shape." },
        { name: "Download the finished wrapper", text: "Click Download .zip to save both files exactly as shown, ready to register as a callable tool." },
      ],
    },
    faq: [
      {
        question: "Do I need to already know the requests library to use this api tool wrapper generator tool?",
        answer:
          "No. The starter file's own docstring explains that requests is a third party dependency installed with pip install requests, and names urllib.request from the standard library as an alternative if a dependency free wrapper is preferred. The pattern around authentication, timeout, status handling and structured errors stays the same either way.",
      },
      {
        question: "Is this the same as a function calling schema?",
        answer:
          "No. A function calling schema is a JSON description of a function's name, description and parameters with no executable logic inside it. This tool builds the function itself, the code that performs the HTTP call, checks the response and returns real data or a structured error, which a schema would describe once it exists.",
      },
      {
        question: "Why does the example use a placeholder API instead of a real one?",
        answer:
          "A real, currently working API key or free tier changes over time in ways that would make a fixed code example stop working without warning. The placeholder endpoint keeps the pattern, authentication, the request call, status handling and the error shape, stable and correct regardless of which real API it is eventually swapped for.",
      },
      {
        question: "How should I store the API key this wrapper needs?",
        answer:
          "In an environment variable set in whatever process actually runs the wrapper, read at call time with os.environ.get, never typed directly into the source file. The starter file already checks for a missing key and returns a structured error naming the variable rather than failing later with an unrelated exception.",
      },
      {
        question: "What happens if the external API is down when this wrapper is called?",
        answer:
          "The function catches a timeout and a connection error separately and returns the same small ok and error dict a successful call would return, rather than an unhandled exception. The calling code can check the ok field and decide what to do next.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/tool-definition-tools",
        label: "Browse more tool definition builder tools",
        description: "Every builder tool in this category, for schemas, API wrappers and structured output contracts.",
      },
      {
        href: "/ide-tools/tool-definition-tools/function-calling-schema-builder-tool",
        label: "See the function calling schema builder tool",
        description: "The JSON description layer this wrapper's code sits underneath once a model needs to know when to call it.",
      },
      {
        href: "/coding-prompts/api-error-handling-prompt",
        label: "Get help writing broader API error handling",
        description: "A prompt for working through error handling across a larger codebase, beyond a single tool wrapper's structured return.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate a structured error response",
        description: "Check that a hand written error dict or a real API's JSON body is well formed before it ships.",
      },
    ],
    externalLinks: [
      {
        href: "https://requests.readthedocs.io/en/latest/user/quickstart/",
        label: "The requests library quickstart",
        description: "The maintained documentation for the HTTP client this wrapper uses, including its own notes on timeouts and response status codes.",
      },
      {
        href: "https://docs.python.org/3/library/urllib.request.html",
        label: "Python's urllib.request documentation",
        description: "The standard library alternative to requests, useful for a dependency free wrapper.",
      },
      {
        href: "https://12factor.net/config",
        label: "The twelve factor app's config principle",
        description: "The independent case for storing credentials and configuration in environment variables rather than in source code.",
      },
      {
        href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
        label: "MDN's HTTP response status code reference",
        description: "A reference for the status codes this wrapper checks explicitly, useful when adding a case for a status the starter file does not name.",
      },
    ],
  },
  tags: ["api wrapper", "python", "tool definition", "in browser editor", "error handling"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
