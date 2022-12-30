import { DefineCommand, DefineOption } from '@artus-cli/artus-cli';
import { TestCommand, TestOption } from './test';

interface CovOption extends TestOption {
  c8?: boolean;
}

@DefineCommand({
  command: 'cov <baseDir> [file...]',
  description: 'Run the coverage',
})
export class CovCommand extends TestCommand {
  @DefineOption<CovOption>({
    c8: {
      type: 'boolean',
      default: true,
    },
  })
  args: CovOption;

  async run() {
    // nothing
  }
}
