import { DefineCommand, Option } from '@artus-cli/artus-cli';
import { TestCommand } from './test';

@DefineCommand({
  command: 'cov <baseDir> [file...]',
  description: 'Run the coverage',
})
export class CovCommand extends TestCommand {
  @Option()
  c8: boolean;

  async run() {
    // nothing
  }
}
