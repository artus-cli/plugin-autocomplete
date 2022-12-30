import { DefineCommand, DefineOption, Command, Option } from '@artus-cli/artus-cli';

export interface TestOption extends Option {
  baseDir: string;
  file: string[]
}

@DefineCommand({
  command: 'test <baseDir> [file...]',
  description: 'Run the unitest',
  alias: [ 't' ],
})
export class TestCommand extends Command {
  @DefineOption()
  options: TestOption;

  async run() {
    console.info('test baseDir', this.options.baseDir);
    console.info('test files', this.options.file);
  }
}
