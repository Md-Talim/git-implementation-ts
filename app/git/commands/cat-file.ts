import fs from "fs";
import zlib from "zlib";
import type { Command } from "../../types/command";
import { getGitObjectPath } from "../../utils/file";

export class CatFileCommand implements Command {
  flag: string;
  commitSHA: string;

  constructor(flag: string, commitSHA: string) {
    this.flag = flag;
    this.commitSHA = commitSHA;
  }

  execute() {
    switch (this.flag) {
      case "-p": {
        const filePath = getGitObjectPath(this.commitSHA);

        if (!fs.existsSync(filePath)) {
          throw new Error(`Not a valid object name ${this.commitSHA}`);
        }

        const fileContents = fs.readFileSync(filePath);
        const outputBuffer = zlib.inflateSync(
          fileContents as unknown as zlib.InputType
        );
        const output = outputBuffer.toString().split("\x00")[1];

        process.stdout.write(output);
      }
    }
  }
}
