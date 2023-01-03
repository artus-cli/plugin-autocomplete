import { DefineCommand, Command, Option } from '@artus-cli/artus-cli';

@DefineCommand({
  command: 'test <baseDir> [file...]',
  description: 'Run the unitest',
  alias: [ 't' ],
})
export class TestCommand extends Command {
  @Option()
  file: string[];

  @Option()
  baseDir: string;

  async run() {
    console.info('test baseDir', this.baseDir);
    console.info('test files', this.file);
  }
}
