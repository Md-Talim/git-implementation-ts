import * as fs from "fs";
import path from "path";

export const initializeGitDirectory = () => {
  const gitDir = path.join(process.cwd(), ".git");

  fs.mkdirSync(path.join(gitDir, "objects"), { recursive: true });
  fs.mkdirSync(path.join(gitDir, "refs"), { recursive: true });
  fs.writeFileSync(path.join(gitDir, "HEAD"), "ref: refs/heads/main\n");

  console.log("Initialized git directory");
};
