import crypto from "crypto";
import fs from "fs";
import path from "path";
import zlib from "zlib";
import type { Command } from "../../types/command";

export class HashObjectCommand implements Command {
  flag: string;
  filename: string;

  constructor(flag: string, filename: string) {
    this.flag = flag;
    this.filename = filename;
  }

  execute() {
    const filepath = path.resolve(this.filename);

    if (!fs.existsSync(filepath)) {
      throw new Error(
        `could not open ${this.filename} for reading: No such file or directory`
      );
    }

    const fileContents = fs.readFileSync(filepath);
    const uncompressedData = `blob ${fileContents.length}\0${fileContents}`;

    const hash = crypto
      .createHash("sha1")
      .update(uncompressedData)
      .digest("hex");
    process.stdout.write(hash);

    if (this.flag === "-w") {
      const folder = hash.slice(0, 2);
      const file = hash.slice(2);

      const folderPath = path.join(process.cwd(), ".git", "objects", folder);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const compressedData = zlib.deflateSync(uncompressedData);
      fs.writeFileSync(
        path.join(folderPath, file),
        compressedData as unknown as string
      );
    }
  }
}
