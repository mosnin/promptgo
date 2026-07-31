import type { IdeToolMeta } from "@/lib/ide-tool-types";

const MCP_CLIENT_CONFIG_JSON = `{
  "mcpServers": {
    "example-server": {
      "command": "npx",
      "args": [
        "-y",
        "@example-org/mcp-server-example",
        "--stdio",
        "/absolute/path/to/your/allowed/project/directory"
      ],
      "env": {
        "EXAMPLE_API_KEY": "replace-with-your-real-api-key-from-the-provider-dashboard",
        "EXAMPLE_API_BASE_URL": "https://api.example.com/v1/mcp",
        "EXAMPLE_LOG_LEVEL": "info",
        "EXAMPLE_REQUEST_TIMEOUT_MS": "30000"
      }
    }
  }
}
`;

const REGISTERING_YOUR_SERVER = `# Registering your server

This file explains where the mcp-client-config.json entry actually needs to
live once you have a real server to point it at, and how to add a second
server entry beside the example one without breaking the first.

## Where the config file lives

An MCP server itself has no client config of its own. The command and args
block lives inside whichever client is launching the server, so the file
path depends on which client you are configuring, not on the server.

- Claude Desktop on macOS: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
- Claude Desktop on Windows: \`%APPDATA%\\Claude\\claude_desktop_config.json\`
- Most IDE integrations that support MCP (for example a project level MCP
  panel in an editor) read an equivalent file scoped to the project instead
  of a global one, commonly named something like \`mcp.json\` inside a hidden
  project settings folder. Check the specific client's own documentation for
  the exact file name and path, since this detail is the one part of the
  format that is not standardised across clients.

Whichever file you edit, replace the placeholder key \`example-server\` with a
short, unique name for your server before saving, and restart the client so
it rereads the file and starts the process.

## Adding a second server entry

The \`mcpServers\` object accepts any number of named entries side by side.
Copy the whole \`example-server\` block, paste it as a second entry inside the
same \`mcpServers\` object, give it a new unique key, and change its \`command\`,
\`args\` and \`env\` to match the second server. Every entry needs its own
\`command\`, the executable that starts that particular server, and its own
\`args\` array, the arguments passed to that executable, including any paths
the server needs permission to read.

\`\`\`json
{
  "mcpServers": {
    "example-server": {
      "command": "npx",
      "args": ["-y", "@example-org/mcp-server-example"]
    },
    "second-server": {
      "command": "node",
      "args": ["/absolute/path/to/second-server/build/index.js"]
    }
  }
}
\`\`\`

## Common mistakes worth checking first

A server that fails to appear after a restart is almost always one of a
small number of causes: a relative path used in \`args\` where the client
needs an absolute one, a missing comma or an extra trailing comma left over
from copying a second entry, or a key duplicated by accident when two
entries were meant to be separate. Validate the file as JSON before
reopening the client; a single syntax error stops every server in the file
from loading, not just the one that was being edited.

The \`env\` block is optional and only needed when the server itself reads
environment variables at startup, commonly an API key or a base URL for a
service it calls. Leave it out entirely for a server that only needs its
command and arguments to run.
`;

const meta: IdeToolMeta = {
  slug: "mcp-server-manifest-generator-tool",
  title: "MCP Server Manifest Generator Tool: Client Config JSON in the Browser",
  name: "MCP Server Manifest Generator",
  category: "mcp-server-tools",
  summary:
    "Open a real, valid mcp-client-config.json in an in-browser editor, with one example server entry filled in, plus a guide to registering a second server, ready to rewrite and download.",
  seo: {
    primaryKeyword: "mcp server manifest generator tool",
    keywords: [
      "mcp server manifest generator tool",
      "mcp client config generator tool",
      "claude desktop mcp server config template",
      "mcp server json config generator",
      "free mcp server config builder",
    ],
    seoTitle: "MCP Server Manifest Generator Tool: Client Config JSON Free",
    seoDescription:
      "A free mcp server manifest generator tool that opens a real mcp-client-config.json with a working server entry in your browser, ready to edit and download.",
  },
  files: [
    { path: "mcp-client-config.json", content: MCP_CLIENT_CONFIG_JSON, kind: "json" },
    { path: "reference/registering-your-server.md", content: REGISTERING_YOUR_SERVER, kind: "markdown" },
  ],
  eeat: {
    author: "Fast Prompts",
    authorCredential: "Structured against the client configuration shape published in the official Model Context Protocol quickstart documentation.",
    testedOn: ["GPT-5.2", "Claude Opus 4.5", "Gemini 3 Pro"],
    testingNote:
      "Models asked to write an MCP client config from memory frequently invent a shape close to but not matching what a real client reads: a top level array instead of the mcpServers object, a missing command field, or an args value written as a single space separated string instead of a JSON array. A fixed starter file matching the documented shape exactly, with args already written as a real array, removes that guesswork before a visitor edits a single value.",
  },
  article: {
    intro: [
      "This mcp server manifest generator tool opens a real, working mcp-client-config.json directly in your browser: a single mcpServers entry with the command, args and env fields a client actually reads, filled in with placeholder but realistic values rather than left as an empty shell. Nothing here is generated on the fly; the file is written out in full so its shape is obvious at a glance, ready to be rewritten into whatever server you are actually registering.",
      "This is a client side registration file, not the server's own code. A separate builder tool in this same category starts a running server's source files; this one starts the small JSON block that tells a desktop app or an editor integration which command to run to launch that server and which arguments and environment variables to pass it. The two are complementary rather than overlapping: one produces something that runs, the other produces the entry that gets a client to run it.",
      "Everything here runs in the tab, which is what makes it a genuinely free mcp server config builder rather than a signup gated service: editing the starter file, adding a second server entry, importing a .zip you already have, and downloading the result as a fresh .zip all happen client side, with nothing uploaded anywhere in between.",
    ],
    sections: [
      {
        heading: "What a client config file actually is",
        body: [
          "Most MCP compatible clients register a local server the same way: a small JSON block naming the command used to launch it, the arguments passed to that command, and, where the server needs it, an env object of environment variables. The most widely documented client keys that block under a top level mcpServers object, one entry per server named by a short key, so one file can list several servers side by side; some editor integrations use a differently named top level key for the same shape, so the reference file below points at where to confirm it.",
          "The starter file this mcp server manifest generator tool opens follows the documented mcpServers shape: a command field set to a real launcher like npx, an args array written as a genuine JSON array rather than one long string, and an env object with realistic placeholder variables. Nothing about the shape is invented for this tool; it mirrors the format published in the official MCP client documentation.",
        ],
      },
      {
        heading: "Command, args and env, field by field",
        body: [
          "The command field is the executable a client spawns to start the server, most often npx for a published package, or node or python pointed at a built entry file for a local one. The args field is a JSON array, not a single string, and every separate flag or path the command needs is its own array entry; a client that receives one long space separated string where an array was expected will usually fail to start the server at all, the single most common mistake this template exists to prevent.",
          "The env field is optional and only needed when the server reads environment variables at startup, most commonly an API key, a base URL, or a log level. A server that only needs its command and arguments to run can leave env out entirely.",
        ],
        list: [
          "command: the executable a client runs to start the server.",
          "args: the exact arguments passed to that executable, each one its own array entry.",
          "env: optional environment variables the server reads at startup, such as an API key.",
        ],
      },
      {
        heading: "Where this file actually lives once it is real",
        body: [
          "The bundled reference/registering-your-server.md file names the concrete path for the most common desktop client on macOS and Windows, and notes that other IDE integrations typically read an equivalent, project scoped file instead of a global one. That detail, the file's name and location, is the one part that genuinely varies by client, so the reference file points at the right documentation rather than guessing at every client by name.",
        ],
      },
      {
        heading: "This is not the same as a skill manifest or the server itself",
        body: [
          "It is easy to conflate this with two neighbouring files. A skill manifest describes a static bundle of skill files: a name, a version, the inputs it expects, with no server and nothing running. A running server's own source code, the file this category's server starter builds, is the program the command field here launches. This mcp server manifest generator tool covers a third, narrower job: the registration block a client reads to find and start that program, nothing about the program's own behaviour.",
        ],
      },
      {
        heading: "Adding a second server entry without breaking the first",
        body: [
          "A single config file commonly ends up listing more than one server once a setup grows past its first integration. The bundled reference file walks through copying the whole example-server block, pasting it as a sibling entry under the same mcpServers key with a new unique name, and pointing its own command, args and env at the second server, plus the JSON syntax mistakes, a missing comma or a relative path, that most often stop every server in the file from loading.",
        ],
      },
    ],
    howTo: {
      name: "How to build an MCP client config with this tool",
      steps: [
        { name: "Read the starter files", text: "Open mcp-client-config.json and reference/registering-your-server.md to see the real example entry and where the file lives." },
        { name: "Rename the example server key", text: "Replace example-server with a short, unique name for the server you are registering." },
        { name: "Set the real command and args", text: "Change command to the executable that starts your server and rewrite args as a JSON array with the real package name and any real paths it needs." },
        { name: "Fill in or remove env", text: "Set real environment variable names and placeholder values your server reads at startup, or delete the env object entirely if it needs none." },
        { name: "Add a second entry if needed", text: "Follow reference/registering-your-server.md to copy the block as a sibling entry under mcpServers for a second server." },
        { name: "Download and paste into your client", text: "Click Download .zip, then copy the finished mcpServers entry into your client's own config file at the path the reference file names." },
      ],
    },
    faq: [
      {
        question: "What does this mcp server manifest generator tool actually produce?",
        answer:
          "It opens a real, valid mcp-client-config.json file: a single mcpServers entry with command, args and env fields already filled in with placeholder but realistic values, matching the shape a real MCP compatible client reads to launch a local server. It is a starting point to edit and paste into your own client's config, not a hosted service.",
      },
      {
        question: "Is this the same as an MCP server manifest describing the server itself?",
        answer:
          "No. This file is the client side registration block, the command and arguments a client runs to start a server, not the server's own source code or its internal tool and resource definitions. A separate builder tool in this category covers scaffolding the server's own files; use this one for the config entry that points a client at it.",
      },
      {
        question: "Can I register more than one server in the same file with this claude desktop mcp server config template?",
        answer:
          "Yes. The mcpServers object accepts any number of named entries side by side. The bundled reference file walks through copying the example block as a second entry with its own unique key and its own command, args and env, along with the common JSON mistakes that stop every server in the file loading at once.",
      },
      {
        question: "Is anything I type into this mcp client config generator tool saved or uploaded anywhere?",
        answer:
          "No. The editor holds your changes only in the browser tab's own memory for the length of your visit. Nothing is sent to a server as you type, and nothing is stored once you close or reload the page, so downloading the .zip before you leave is the only way to keep your work.",
      },
      {
        question: "Does this mcp server json config generator validate my finished file for me?",
        answer:
          "No. It gives you a real, valid starting file and a guide to editing it, but it does not parse or check whatever you change it into afterward. Pasting the finished file into a JSON formatter and validator before handing it to a client is the fastest way to catch a missing comma or an unclosed bracket.",
      },
    ],
    internalLinks: [
      {
        href: "/ide-tools/mcp-server-tools",
        label: "Browse more MCP server builder tools",
        description: "Every builder tool in this category, for starting a server's own files, its tool definitions and its client registration config.",
      },
      {
        href: "/ide-tools/skill-authoring-tools/ai-skill-builder-tool",
        label: "Start a new AI skill's files",
        description: "The companion builder tool for a skill's own multi file structure, a genuinely different job from registering a running server.",
      },
      {
        href: "/tools/json-formatter-validator",
        label: "Validate the finished JSON",
        description: "Paste the edited mcp-client-config.json here to catch a missing comma or an unclosed bracket before handing it to a client.",
      },
      {
        href: "/coding-prompts/api-documentation-prompt",
        label: "Get help documenting the server's own API",
        description: "A prompt for writing clear documentation of the endpoints or tools a server exposes, useful once the server behind this config is real.",
      },
    ],
    externalLinks: [
      {
        href: "https://modelcontextprotocol.io/quickstart/user",
        label: "The official MCP client quickstart",
        description: "Anthropic's own documentation showing the exact mcpServers, command and args JSON shape this starter file follows, plus the config file's real path on macOS and Windows.",
      },
      {
        href: "https://www.anthropic.com/news/model-context-protocol",
        label: "Anthropic's introduction of MCP",
        description: "Anthropic's own announcement of the standard this client config registers a server against, useful background for what the client does with the entry once it is added.",
      },
      {
        href: "https://code.visualstudio.com/docs/copilot/customization/mcp-servers",
        label: "VS Code's MCP server documentation",
        description: "A second major editor's own documentation on registering a local MCP server, useful for comparing how the config file's name and location vary by client.",
      },
      {
        href: "https://www.json.org/json-en.html",
        label: "The JSON specification",
        description: "The independent, formal specification for the JSON syntax this config file and its example values are written in.",
      },
    ],
  },
  tags: ["mcp client config", "mcp server registration", "mcpServers json", "in browser editor"],
  updated: "2026-07-31",
  published: "2026-07-31",
};

export default meta;
