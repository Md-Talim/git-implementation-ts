import { GitClient } from "@/git/client";
import { CatFileCommand } from "@/git/commands/cat-file";
import { HashObjectCommand } from "@/git/commands/hash-object";
import { LSTreeCommand } from "@/git/commands/ls-tree";
import { initializeGitDirectory } from "@/utils/git-init";

const args = process.argv.slice(2);
const command = args[0];

enum Commands {
  Init = "init",
  CatFile = "cat-file",
  HashObject = "hash-object",
  LSTree = "ls-tree",
}

const gitClient = new GitClient();

const handleCatFileCommand = () => {
  const flag = args[1];
  const commitSHA = args[2];
  const catFileCommand = new CatFileCommand(flag, commitSHA);

  gitClient.run(catFileCommand);
};

const handleHashObjectCommand = () => {
  let flag = args[1];
  let filename = args[2];

  if (!filename) {
    filename = flag;
    flag = "";
  }

  const hashObjectCommand = new HashObjectCommand(flag, filename);
  gitClient.run(hashObjectCommand);
};

const handleLSTreeCommand = () => {
  let flag = args[1];
  let sha = args[2];

  if (!sha && flag === "--name-only") return;

  if (!sha) {
    sha = flag;
    flag = "--name-only";
  }

  const lsTreeCommand = new LSTreeCommand(flag, sha);
  gitClient.run(lsTreeCommand);
};

switch (command) {
  case Commands.Init:
    initializeGitDirectory();
    break;
  case Commands.CatFile:
    handleCatFileCommand();
    break;
  case Commands.HashObject:
    handleHashObjectCommand();
    break;
  case Commands.LSTree:
    handleLSTreeCommand();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
