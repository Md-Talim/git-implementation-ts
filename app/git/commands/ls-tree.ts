import type { Command } from "@/types/command";
import fs from "fs";
import path from "path";
import zlib from "zlib";

export class LSTreeCommand implements Command {
  flag: string;
  sha: string;

  constructor(flag: string, sha: string) {
    this.flag = flag;
    this.sha = sha;
  }

  execute() {
    const flag = this.flag;
    const sha = this.sha;

    const folder = sha.slice(0, 2);
    const file = sha.slice(2);

    const folderPath = path.join(process.cwd(), ".git", "objects", folder);
    const filePath = path.join(folderPath, file);

    if (!fs.existsSync(folderPath) || !fs.existsSync(filePath)) {
      throw new Error(`Not a valid object ${sha}`);
    }

    const fileContents = fs.readFileSync(filePath);
    const outputBuffer = zlib.inflateSync(
      fileContents as unknown as zlib.InputType
    );
    const output = outputBuffer.toString().split("\0");

    if (flag === "--name-only") {
      const treeContent = output
        .slice(1, -1)
        .reduce(
          (acc: string[], e) => [...acc, e.split(" ").at(-1) as string],
          []
        )
        .join("\n");

      process.stdout.write(`${treeContent}`);
    }
  }
}
