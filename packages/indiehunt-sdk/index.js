const DEFAULT_BASE = "https://indiehunt.io";

export class IndieHunt {
  constructor({ baseUrl = DEFAULT_BASE, token, fetchImpl = fetch } = {}) {
    this.baseUrl = String(baseUrl).replace(/\/$/, "");
    this.token = token || "";
    this.fetchImpl = fetchImpl;
  }

  async request(path, { method = "GET", body } = {}) {
    const headers = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (this.token) headers.Authorization = `Bearer ${this.token}`;
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(data?.error?.message || `IndieHunt API ${response.status}`);
      error.status = response.status;
      error.body = data;
      throw error;
    }
    return data;
  }

  search(query, { limit = 8, grouped = false } = {}) {
    const params = new URLSearchParams({ q: query, limit: String(limit) });
    if (grouped) params.set("grouped", "true");
    return this.request(`/api/v1/search?${params}`);
  }

  listProjects({ status = "ongoing", limit = 20, offset = 0 } = {}) {
    const params = new URLSearchParams({
      status,
      limit: String(limit),
      offset: String(offset),
    });
    return this.request(`/api/v1/projects?${params}`);
  }

  getProject(slug) {
    return this.request(`/api/v1/projects/${encodeURIComponent(slug)}`);
  }

  listCategories() {
    return this.request("/api/v1/categories");
  }

  currentWeek() {
    return this.request("/api/v1/weeks/current");
  }

  listSandboxProjects() {
    return this.request("/api/sandbox/v1/projects");
  }
}

export async function createAnonymousClient(options = {}) {
  const base = new IndieHunt(options);
  const issued = await base.request("/api/agent/register", {
    method: "POST",
    body: { type: "anonymous" },
  });
  return new IndieHunt({ ...options, token: issued.access_token });
}
