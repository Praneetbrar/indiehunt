# IndieHunt agent notes

IndieHunt (https://indiehunt.io) is a weekly launch platform for AI products and indie SaaS. Free is $0. Premium is $29 one-time. There is no paid nofollow plan.

Public repository: https://github.com/Praneetbrar/indiehunt

## How to work in this repo

- Read `/llms.txt`, `/developers`, and `/openapi.json` before adding API surface.
- Public reads need no key. Do not require a token on `/api/v1/projects`, `/api/v1/search`, `/api/v1/categories`, or `/api/v1/weeks/current`.
- Agent discovery files live under `app/.well-known/` and `app/libs/agent/`. Keep `plugin.json`, `mcp.json`, and `skills/*/SKILL.md` in sync with those payloads.
- Product MCP is `/mcp`. Documentation MCP is `/mcp/docs`. Both use Streamable HTTP.
- Sandbox fixtures are `/api/sandbox/v1/projects` and must not write production rows.
- Do not commit `.env` files.

## Free tools

New tools go ONLY in the registry (`app/libs/free-tools.js`) and the `/tools` page, which reads that registry. Never add individual tool links to the footer or header. The footer has one link, "Free tools", to `/tools`. Adding a tool to the registry adds it to `/tools`, `sitemap.xml`, and the llms files.
