import { GitHubService } from "../services/githubService.js";

/**
 * Get authenticated GitHub user profile
 */
export const getProfile = async (req, res) => {
  try {
    const token = req.user?.accessToken;
    if (!token) return res.status(401).json({ error: "No GitHub token found" });

    const gitHubService = new GitHubService(token);
    const profile = await gitHubService.getUserProfile();

    return res.json({ profile });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to fetch GitHub profile" });
  }
};

/**
 * Get all repositories of authenticated user
 */
export const getRepos = async (req, res) => {
  try {
    const token = req.user?.accessToken;
    if (!token) return res.status(401).json({ error: "No GitHub token found" });

    const gitHubService = new GitHubService(token);
    const repos = await gitHubService.getUserRepos();

    return res.json({ repos });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Failed to fetch repositories" });
  }
};

/**
 * Get a single repository by name
 */
export const getRepoByName = async (req, res) => {
  try {
    const token = req.user?.accessToken;
    const { repoName } = req.params;

    if (!token) return res.status(401).json({ error: "No GitHub token found" });
    if (!repoName)
      return res.status(400).json({ error: "Repository name required" });

    const gitHubService = new GitHubService(token);
    const repo = await gitHubService.getRepoByName(repoName);

    return res.json({ repo });
  } catch (err) {
    console.error(err);
    // Ownership or not found errors
    return res.status(403).json({ error: err.message || "Access denied" });
  }
};
