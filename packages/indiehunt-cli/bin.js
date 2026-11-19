#!/usr/bin/env node

const base = (process.env.INDIEHUNT_BASE_URL || "https://indiehunt.io").replace(/\/$/, "");
const [command, ...rest] = process.argv.slice(2);

function usage() {
  console.log(`indiehunt — IndieHunt CLI

  indiehunt projects [--status ongoing|scheduled|launched|all]
  indiehunt search <query>
  indiehunt project <slug>
  indiehunt sandbox
  indiehunt register

Env: INDIEHUNT_BASE_URL (default https://indiehunt.io)
`);
}

async function get(path) {
  const response = await fetch(`${base}${path}`, { headers: { Accept: "application/json" } });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    console.error(data?.error?.message || `Request failed (${response.status})`);
    process.exit(1);
  }
  console.log(JSON.stringify(data, null, 2));
}

if (!command || command === "help" || command === "--help") {
  usage();
  process.exit(command ? 0 : 1);
}

if (command === "projects") {
  const statusFlag = rest.indexOf("--status");
  const status = statusFlag >= 0 ? rest[statusFlag + 1] : "ongoing";
  await get(`/api/v1/projects?status=${encodeURIComponent(status || "ongoing")}&limit=20`);
} else if (command === "search") {
  const query = rest.join(" ").trim();
  if (query.length < 2) {
    console.error("Search query must be at least 2 characters.");
    process.exit(1);
  }
  await get(`/api/v1/search?q=${encodeURIComponent(query)}`);
} else if (command === "project") {
  if (!rest[0]) {
    console.error("Usage: indiehunt project <slug>");
    process.exit(1);
  }
  await get(`/api/v1/projects/${encodeURIComponent(rest[0])}`);
} else if (command === "sandbox") {
  await get("/api/sandbox/v1/projects");
} else if (command === "register") {
  const response = await fetch(`${base}/api/agent/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ type: "anonymous" }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    console.error(data?.error?.message || `Register failed (${response.status})`);
    process.exit(1);
  }
  console.log(JSON.stringify(data, null, 2));
} else {
  usage();
  process.exit(1);
}
