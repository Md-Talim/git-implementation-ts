import path from "path";

export const getGitObjectPath = (commitSHA: string): string => {
  const folder = commitSHA.slice(0, 2);
  const file = commitSHA.slice(2);

  return path.join(process.cwd(), ".git", "objects", folder, file);
};
