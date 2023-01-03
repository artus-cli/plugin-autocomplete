import { DefineCommand, Command, Option } from '@artus-cli/artus-cli';

@DefineCommand({
  command: 'dev [baseDir]',
  description: 'Run the development server',
  alias: [ 'd' ],
})
export class DevCommand extends Command {
  @Option({
    alias: 'p',
    default: 3000,
    description: 'Start A Server',
  })
  port: number;

  @Option({
    default: false,
    description: 'Debug with node-inspector',
  })
  inspect: boolean;

  @Option()
  nodeFlags: string;

  async run() {
    // nothing
  }
}
