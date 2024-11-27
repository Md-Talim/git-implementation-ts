import fs from "fs";
import path from "path";
import zlib from "zlib";

export class CatFileCommand {
  flag: string;
  commitSHA: string;

  constructor(flag: string, commitSHA: string) {
    this.flag = flag;
    this.commitSHA = commitSHA;
  }

  execute() {
    switch (this.flag) {
      case "-p": {
        const folder = this.commitSHA.slice(0, 2);
        const file = this.commitSHA.slice(2);

        const filePath = path.join(
          process.cwd(),
          ".git",
          "objects",
          folder,
          file
        );

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
