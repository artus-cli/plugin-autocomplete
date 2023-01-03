import { DefineCommand, Option } from '@artus-cli/artus-cli';
import { DevCommand } from './dev';

@DefineCommand({
  command: 'debug [baseDir]',
  description: 'Run the development server at debug mode',
})
export class DebugCommand extends DevCommand {
  @Option({
    alias: 'f',
    default: 0,
  })
  flags: number;

  async run() {
    // nothing
  }
}
