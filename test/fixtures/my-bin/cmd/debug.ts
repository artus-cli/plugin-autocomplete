import { DefineCommand, DefineOption } from '@artus-cli/artus-cli';
import { DevCommand, DevOption } from './dev';

interface DebugOption extends DevOption {
  flags?: number;
}

@DefineCommand({
  command: 'debug [baseDir]',
  description: 'Run the development server at debug mode',
})
export class DebugCommand extends DevCommand {
  @DefineOption<DebugOption>({
    flags: {
      type: 'number',
      alias: 'f',
      default: 0,
    },
  })
  args: DebugOption;

  async run() {
    // nothing
  }
}
