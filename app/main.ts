import * as fs from "fs";
import { GitClient } from "./git/client";
import { CatFileCommand } from "./git/commands/cat-file";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
}

const gitClient = new GitClient();

const handleCatFileCommand = () => {
  const flag = args[1];
  const commitSHA = args[2];

  const catFileCommand = new CatFileCommand(flag, commitSHA);

  gitClient.run(catFileCommand);
};

switch (command) {
  case Commands.Init:
    fs.mkdirSync(".git", { recursive: true });
    fs.mkdirSync(".git/objects", { recursive: true });
    fs.mkdirSync(".git/refs", { recursive: true });
    fs.writeFileSync(".git/HEAD", "ref: refs/heads/main\n");
    console.log("Initialized git directory");
    break;
  case Commands.CatFile:
    handleCatFileCommand();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
