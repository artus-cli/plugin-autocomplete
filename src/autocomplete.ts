import { DefineCommand, Command, Option, DefineOption, Program, Inject } from '@artus-cli/artus-cli';
import inquirer from 'inquirer';
import os from 'node:os';
import path from 'node:path';
import scripts from './scripts';
const supportShellTypes = [ 'zsh', 'bash' ];

export interface AutoCompleteOption extends Option {
  shell?: string;
}

@DefineCommand({
  command: 'autocomplete [shell]',
  description: 'autocomplete installation',
})
export class AutoCompleteCommand extends Command {
  @Inject()
  program: Program;

  @DefineOption()
  args: AutoCompleteOption;

  async run() {
    let shell = this.args.shell;
    if (os.platform() === 'win32') {
      console.info('Autocomplete is not support windows');
      return;
    }

    if (!shell || !supportShellTypes.includes(shell)) {
      const result = await inquirer.prompt([{
        name: 'shell',
        type: 'list',
        message: 'Please choice your shell type',
        choices: supportShellTypes,
      }]);

      shell = result.shell;
    }

    const rcFile = path.resolve(os.homedir(), shell === 'zsh' ? '.zshrc' : '.bashrc');
    const script = scripts[shell](this.program.binName, process.argv[1]);
    console.info(`\nPlease copy the scripts to ${rcFile} manually.`);
    console.info(script);
  }
}
