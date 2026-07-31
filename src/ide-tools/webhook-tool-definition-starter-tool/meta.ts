import type { IdeToolMeta } from "@/lib/ide-tool-types";

const WEBHOOK_HANDLER_PY = `"""Starter webhook handler: verify the signature before you parse.

This is a webhook tool definition starter tool file, built for a tool
that receives an inbound webhook rather than calling out to an
external API. Replace WEBHOOK_SECRET with a real shared secret read
from an environment variable, never hard coded here, and replace the
signature header name and event handling below to match the real
service that will call this endpoint.

The order of operations below follows the pattern documented by major
webhook senders such as GitHub and Stripe: read the raw request body
exactly as bytes, compute an HMAC of that raw body using the shared
secret, compare it against the signature the sender included in a
request header using a constant time comparison, and only parse the
body as structured data once that comparison passes. Doing these
steps in any other order, especially parsing before verifying, means
untrusted data reaches your application code before you know who
actually sent it.
"""

import hashlib
import hmac
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "")
SIGNATURE_HEADER = "X-Signature-256"


def compute_signature(raw_body: bytes, secret: str) -> str:
    """Return the expected signature for raw_body, written in the
    same "sha256=<hex digest>" shape a real sender's own signature
    header uses, so the comparison below lines up exactly with what
    an authentic request actually sends."""
    digest = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    return f"sha256={digest}"


def signature_is_valid(raw_body: bytes, header_value: str, secret: str) -> bool:
    """Verify a webhook signature using a constant time comparison.

    A plain equality check on two strings can leak timing information
    about how many leading characters matched, which an attacker can
    use to guess a valid signature one byte at a time. hmac.compare_digest
    runs in the same amount of time no matter where the two values
    first differ, which is why it, not ==, belongs here.
    """
    if not header_value or not secret:
        return False
    expected = compute_signature(raw_body, secret)
    return hmac.compare_digest(expected, header_value)


class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_length)

        header_value = self.headers.get(SIGNATURE_HEADER, "")
        if not signature_is_valid(raw_body, header_value, WEBHOOK_SECRET):
            self.send_response(401)
            self.end_headers()
            self.wfile.write(b"invalid signature")
            return

        try:
            payload = json.loads(raw_body)
        except ValueError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"malformed payload")
            return

        event_type = self.headers.get("X-Event-Type", "unknown")
        handle_event(event_type, payload)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")


def handle_event(event_type: str, payload: dict) -> None:
    """Replace this with the real handling logic for each event type
    this webhook receives. Keeping it separate from the HTTP handler
    above keeps the verification and parsing steps easy to test on
    their own, without a real HTTP request in the loop, and keeps a
    slow downstream action from delaying the response the sender is
    waiting on."""
    print(f"received verified event: {event_type}")


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 8080), WebhookHandler)
    print("listening for inbound webhook deliveries on port 8080")
    server.serve_forever()
`;

const WEBHOOK_SECURITY_NOTES = `# Webhook security notes

Read this before wiring webhook_handler.py to a real event source.
The single most important rule for an inbound webhook endpoint is
verify the signature before you do anything else with the request
body, including parsing it. This file explains why that ordering
matters and names the real documentation the pattern here was
checked against.

## Why the order matters

An inbound webhook is a URL you expose to the public internet so
another service can call it. Unlike an outbound API call your own
code chooses to make, you cannot control who sends a request to that
URL. Anyone who finds the endpoint can send a POST request shaped
like a real event. If a handler parses the body into an object first
and checks the signature afterward, or never checks it at all, every
downstream step, updating a record, sending a notification,
triggering a job, runs on data an attacker fully controls.

Verifying first means a forged or replayed request is rejected before
a single field of its payload is trusted, which is why
webhook_handler.py computes and compares the signature before it ever
calls json.loads on the body.

## The pattern this follows

Major webhook senders document the same three step pattern:

1. Read the raw, unparsed request body, exactly as bytes.
2. Compute an HMAC of that raw body using a shared secret only you
   and the sender know, then compare it against a signature the
   sender included in a request header.
3. Only after that comparison passes, parse the body as JSON and act
   on it.

GitHub's own webhook documentation describes exactly this: the
signature arrives in an X-Hub-Signature-256 header, computed as an
HMAC SHA256 hex digest of the raw payload using the webhook's secret
token, prefixed with sha256=. GitHub's own guidance is explicit that
the comparison must use a constant time function such as
hmac.compare_digest in Python, never a plain equality operator,
because a naive string comparison can leak timing information an
attacker uses to guess a valid signature one byte at a time. Stripe's
webhook documentation follows the same shape, signing a raw payload
with HMAC SHA256 and adding a timestamp to the signed value so an old,
captured request cannot be replayed later, and its guidance warns
explicitly that any reformatting of the raw body, changed whitespace,
reordered keys, a different character encoding, breaks the signature
even for a genuine request.

## Common mistakes this starter avoids

- Parsing the body before verifying it, which means untrusted JSON
  reaches application code before the sender is confirmed.
- Hashing a parsed and re-serialised body instead of the raw bytes
  that were actually received, which breaks the signature for a
  genuine request the moment re-serialisation changes whitespace or
  key order.
- Comparing signatures with a plain equality operator instead of a
  constant time comparison function such as hmac.compare_digest in
  Python or crypto.timingSafeEqual in Node.
- Storing the shared secret in source code instead of an environment
  variable or a secrets manager.

## What this starter does not cover

This starter checks one signature scheme shape, a single HMAC header
compared against a locally computed hash. It does not include a
signed timestamp or a replay window, the extra step Stripe's own
scheme adds to reject an old, captured request even when its
signature is otherwise valid. Check the specific service's own
webhook documentation for its exact header name, algorithm and any
extra signed fields before wiring this handler to a real event
source.
`;

const meta: IdeToolMeta = {
  slug: "webhook-tool-definition-starter-tool",
  title: "Webhook Tool Definition Starter Tool: Verify Before You Parse",
  name: "Webhook Tool Definition Starter",
  category: "tool-definition-tools",
  summary:
    "Open a real inbound webhook handler in an in-browser editor, one that verifies the HMAC signature header before it parses a single field of the payload, then rewrite it into your own webhook tool definition and download it.",
  seo: {
    primaryKeyword: "webhook tool definition starter tool",
    keywords: [
      "webhook tool definition starter tool",
      "inbound webhook handler starter file",
      "hmac signature verification template",
      "free webhook endpoint starter kit",
      "webhook payload verification guide",
    ],
    seoTitle: "Webhook Tool Definition Starter Tool: Verify Before You Parse",
    seoDescription:
      "A free webhook tool definition starter tool with a Python handler that verifies the HMAC signature header before parsing any inbound webhook payload at all.",
  },
  files: [
    { path: "webhook_handler.py", content: WEBHOOK_HANDLER_PY, kind: "code" },
    { path: "reference/webhook-security-notes.md", content: WEBHOOK_SECURITY_NOTES, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential:
      "Structured against the HMAC signature verification pattern documented by GitHub's and Stripe's own webhook security guides.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "A model asked to draft an inbound webhook handler from scratch will often parse the request body into an object first and check the signature afterward, or skip the constant time comparison entirely in favour of a plain equality operator, both of which quietly defeat the point of signing the request at all. A starter file that verifies first, using hmac.compare_digest rather than ==, and only parses the body once that check passes, keeps that ordering correct from the first line rather than leaving it to be discovered during a security review.",
  },
  article: {
    intro: [
      "This webhook tool definition starter tool opens a real, working inbound webhook handler directly in your browser: a Python file that reads the raw request body, verifies its HMAC signature header against a shared secret using a constant time comparison, and only then parses the payload and hands it to your own event logic. Nothing here is a stub with the security check left as a comment; verification is written in full and runs first, the order a real webhook handler needs.",
      "A webhook is the reverse of the API calls most agent tooling is built around. Instead of code reaching out and reading back a response, an inbound webhook is a URL exposed so an external service can reach in and notify your code, on its own schedule. That reversal is why a webhook tool definition needs a step other tool definitions do not: proving the request came from the service that claims to have sent it, before trusting a single field inside it.",
      "Everything runs in the tab you are reading this in, which makes this a genuinely free webhook endpoint starter kit rather than a signup gated service, and is why both files are worth reading in full before wiring either to a real, public endpoint.",
    ],
    sections: [
      {
        heading: "What the starter files actually contain",
        body: [
          "webhook_handler.py is a small, complete HTTP server built on Python's standard library, with no external framework required. It defines a function that computes the expected signature for a request body and secret, a function that compares that value against the header a sender included, and a request handler that calls both, in order, before it ever touches the body as structured data.",
          "reference/webhook-security-notes.md is the inbound webhook handler starter file's companion explanation and doubles as a short webhook payload verification guide: why the verify-then-parse order matters, which real documentation the pattern was checked against, and the specific mistakes it is written to avoid.",
        ],
      },
      {
        heading: "Why verification has to happen before parsing",
        body: [
          "An inbound webhook endpoint is public by definition; anything with the URL can send a request shaped like a real event. If a handler parses the body before checking who sent it, a forged request gets exactly as far into the code as a genuine one, until whatever step finally checks the signature, if one exists at all. Verifying first closes that gap: a request with a missing or wrong signature is rejected before json.loads is ever called.",
        ],
      },
      {
        heading: "The hmac signature verification template this handler follows",
        body: [
          "The handler computes an HMAC SHA256 hex digest of the raw body using a shared secret, formats it as sha256=<digest>, and compares that value against the header a sender included, the same shape GitHub's webhook documentation describes for its X-Hub-Signature-256 header. Stripe's documentation follows a related shape, adding a signed timestamp so a captured request cannot be replayed later, and both warn that the raw, unparsed body has to be what gets hashed, since re-serialising JSON before hashing it can break a genuine signature.",
        ],
        list: [
          "Read the request body as raw bytes, before any JSON parsing happens.",
          "Compute the HMAC using the shared secret and the raw body, not a parsed and re-serialised version of it.",
          "Compare the computed value against the header the sender actually sent, and reject the request on any mismatch.",
        ],
      },
      {
        heading: "Constant time comparison and why == is not enough",
        body: [
          "A plain string equality check returns as soon as it finds the first character that does not match, so a comparison against an almost correct guess takes measurably longer than one against a completely wrong guess, a difference an attacker who can time many requests can exploit to reconstruct a valid signature one byte at a time. hmac.compare_digest, used here, and its equivalent crypto.timingSafeEqual in Node, take the same amount of time regardless of where the two values differ, which is why the reference notes treat it as a required step, not an optional hardening detail.",
        ],
      },
      {
        heading: "How this differs from an outbound API tool wrapper",
        body: [
          "It is worth being precise about direction, since the two are easy to conflate. An outbound API tool wrapper, the kind built by a tool wrapper generator elsewhere in this category, defines how your own code calls out to someone else's API and reads back a response it chose to ask for. This webhook tool definition starter tool is the reverse: it defines an endpoint that sits and waits while an external service decides when to call it. That reversal is why proving who sent the request is this starter's first concern, a question an outbound wrapper never has to ask.",
        ],
      },
      {
        heading: "Editing, importing and downloading in the browser",
        body: [
          "The editor beside this article is the same in-browser engine every builder tool on this site shares: a file list, a plain text pane, and a toolbar to add a file, import an existing .zip, reset to the starter handler, or download the current set. Importing and downloading both happen client side, so a real secret typed while editing is never sent anywhere.",
        ],
      },
    ],
    howTo: {
      name: "How to turn this into your own webhook handler",
      steps: [
        { name: "Read both starter files", text: "Open webhook_handler.py and reference/webhook-security-notes.md to see the verify-then-parse flow and the reasoning behind it." },
        { name: "Set the real secret and header name", text: "Replace WEBHOOK_SECRET with a value from an environment variable, and update SIGNATURE_HEADER to match the sending service's header name." },
        { name: "Replace the event handling logic", text: "Rewrite handle_event to do the real work your webhook needs, kept separate from the HTTP handler so verification stays easy to test alone." },
        { name: "Test with both a valid and a forged request", text: "Confirm a correctly signed request is accepted and a wrong or missing signature is rejected with a 401 response." },
        { name: "Download the finished handler", text: "Click Download .zip to save both files exactly as shown, ready to deploy behind a real endpoint." },
      ],
    },
    faq: [
      {
        question: "Do I need a specific web framework to use this webhook tool definition starter tool?",
        answer:
          "No. webhook_handler.py uses Python's own standard library http.server module, so the verify-then-parse logic is readable with no framework knowledge required. compute_signature and signature_is_valid are plain functions that work the same way inside Flask, FastAPI or any other framework's request handling.",
      },
      {
        question: "How is this different from the api tool wrapper generator tool?",
        answer:
          "That tool defines an outbound wrapper: code that calls out to an external API and reads back a response your program requested. This tool defines the opposite direction, an inbound endpoint a third party service calls on its own schedule, which is why signature verification is the first thing this handler does.",
      },
      {
        question: "Why does the handler verify the signature before parsing the payload?",
        answer:
          "Because an inbound webhook endpoint is public, anyone with the URL can send a request shaped like a real event. Verifying first means a forged request is rejected before json.loads runs on the body, so attacker controlled data never reaches the rest of the program.",
      },
      {
        question: "Is anything I type into this editor saved or uploaded anywhere?",
        answer:
          "No. The editor holds changes only in the browser tab's own memory for the length of your visit. Nothing, including a real secret typed in while testing, is sent to a server, so downloading the .zip before you leave is the only way to keep the file set.",
      },
      {
        question: "What happens if I import a .zip that already has different files?",
        answer:
          "Importing replaces the current file set entirely with whatever text files the archive contains, so an existing webhook project can be edited from there instead of starting from the template. Binary files inside the archive are skipped rather than shown corrupted, since the editor only handles plain text.",
      },
      {
        question: "Does this starter protect against a replayed webhook request?",
        answer:
          "Not on its own. It verifies a request's signature matches its body, which stops a forged payload, but it does not check a signed timestamp the way Stripe's own scheme does, so a captured, genuine request could technically be resent later. A timestamp check is worth adding when the sending service signs one.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/tool-definition-tools",
        label: "Browse more tool definition builder tools",
        description: "Every builder tool in this category, for schemas, API wrappers and webhook handlers alike.",
      },
      {
        href: "/ide-tools/mcp-server-tools",
        label: "Scaffold an MCP server instead",
        description: "Starter files for the Model Context Protocol server pattern, a different way of exposing a tool to an agent.",
      },
      {
        href: "/coding-prompts/security-review-prompt",
        label: "Get help reviewing the finished handler",
        description: "A prompt for a structured security review of code you have written, useful once your real secret and event logic are in place.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Document the webhook contract for your team",
        description: "A prompt for turning a rough explanation of an endpoint into clear documentation, useful for writing up what this webhook expects to receive.",
      },
    ],
    externalLinks: [
      {
        href: "https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries",
        label: "GitHub's webhook signature validation guide",
        description: "The authoritative source this handler's header shape and constant time comparison requirement were checked against.",
      },
      {
        href: "https://docs.stripe.com/webhooks",
        label: "Stripe's webhook signature documentation",
        description: "A second major sender's own guidance, adding a signed timestamp and warning explicitly against re-serialising the body before hashing it.",
      },
      {
        href: "https://docs.python.org/3/library/hmac.html#hmac.compare_digest",
        label: "Python's hmac.compare_digest documentation",
        description: "The standard library reference for the constant time comparison function webhook_handler.py uses to check a computed signature.",
      },
      {
        href: "https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b",
        label: "Node's crypto.timingSafeEqual documentation",
        description: "The equivalent constant time comparison function for a webhook handler written in Node instead of Python.",
      },
    ],
  },
  tags: ["webhook", "hmac signature", "inbound endpoint", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
