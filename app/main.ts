import { GitClient } from "./git/client";
import { CatFileCommand } from "./git/commands/cat-file";
import { initializeGitDirectory } from "./utils/git-init";

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
    initializeGitDirectory();
    break;
  case Commands.CatFile:
    handleCatFileCommand();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
