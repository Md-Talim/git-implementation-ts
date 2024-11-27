export class GitClient {
  run(command: { execute: () => void }) {
    command.execute();
  }
}
