import { DefineCommand, DefineOption, Command, Option } from '@artus-cli/artus-cli';

export interface DevOption extends Option {
  port?: number;
  inspect?: boolean;
  nodeFlags?: string;
  baseDir?: string;
}

@DefineCommand({
  command: 'dev [baseDir]',
  description: 'Run the development server',
  alias: [ 'd' ],
})
export class DevCommand extends Command {
  @DefineOption<DevOption>({
    port: {
      type: 'number',
      alias: 'p',
      default: 3000,
      description: 'Start A Server',
    },

    inspect: {
      type: 'boolean',
      default: false,
      description: 'Debug with node-inspector',
    },

    nodeFlags: {
      type: 'string',
    },
  })
  args: DevOption;

  async run() {
    // nothing
  }
}
