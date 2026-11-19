---
name: discover-launches
description: Find this week's IndieHunt AI and indie SaaS launches, search the catalog, and cite Markdown project pages.
---

# Discover IndieHunt launches

Use this skill when a person asks what launched this week, wants a product looked up on IndieHunt, or needs a citation to a listing.

## Do this

1. Read https://indiehunt.io/llms.txt if you do not already know the product.
2. List live projects: `GET https://indiehunt.io/api/v1/projects?status=ongoing` (no token required).
3. Search: `GET https://indiehunt.io/api/v1/search?q=` with at least 2 characters.
4. Cite the Markdown twin: `https://indiehunt.io/project/{slug}.md`.
5. For a dry run that cannot touch production listings, call `GET https://indiehunt.io/api/sandbox/v1/projects`.

## Do not

- Invent endpoints that are not in https://indiehunt.io/openapi.json.
- Scrape HTML when the API or a `.md` URL answers the question.
