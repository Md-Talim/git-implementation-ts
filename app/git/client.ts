import type { Command } from "../types/command";

export class GitClient {
  run(command: Command) {
    command.execute();
  }
}
