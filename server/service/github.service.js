
import fetch from "node-fetch";

export class GitHubService {
  constructor(accessToken) {
    if (!accessToken) throw new Error("GitHub access token is required");
    this.token = accessToken;
    this.baseUrl = "https://api.github.com";
    this.headers = {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github+json",
    };
  }

  // Fetch authenticated GitHub user profile
  async getUserProfile() {
    const res = await fetch(`${this.baseUrl}/user`, { headers: this.headers });
    if (!res.ok)
      throw new Error("Invalid GitHub token or failed to fetch profile");
    const data = await res.json();
    return {
      id: data.id,
      username: data.login,
      avatar: data.avatar_url,
      url: data.html_url,
    };
  }

  // Fetch all repositories user has access to
  async getUserRepos() {
    const res = await fetch(`${this.baseUrl}/user/repos?per_page=100`, {
      headers: this.headers,
    });
    if (!res.ok) throw new Error("Failed to fetch repositories");
    const data = await res.json();

    // Normalize repo data
    return data.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      visibility: repo.private ? "private" : "public",
      defaultBranch: repo.default_branch,
    }));
  }

  // Fetch single repository by name and enforce ownership
  async getRepoByName(repoName) {
    const repos = await this.getUserRepos();
    const repo = repos.find((r) => r.name === repoName);
    if (!repo) throw new Error("Repository not found or access denied");
    return repo;
  }
}
