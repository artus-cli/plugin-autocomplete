import { Program, ParsedCommands, CommandContext, Inject, ApplicationLifecycle, LifecycleHook, LifecycleHookUnit } from '@artus-cli/artus-cli';
import parser from 'yargs-parser';

@LifecycleHookUnit()
export default class TemplateLifecycle implements ApplicationLifecycle {
  @Inject()
  private readonly program: Program;

  @Inject()
  private readonly parsedCommands: ParsedCommands;

  @LifecycleHook()
  async configDidLoad() {
    this.program.use(async (ctx: CommandContext, next) => {
      const _argv: undefined | string | string[] = ctx.args.getCompletionArgv;
      if (!_argv) return next();

      /** passthrough by `--get-completion-argv="xxx xxx"` */
      const argv = Array.isArray(_argv) ? _argv : _argv.split(/\s+/);
      const formatStr = str => str.replace(/:/, '\\:');
      const { fuzzyMatched } = this.parsedCommands.matchCommand(argv.slice(1));
      const completions: string[] = [];

      fuzzyMatched.childs
        .forEach(({ cmd, description }) => {
          completions.push(`${formatStr(cmd)}:${description}`);
        });

      Object.keys(fuzzyMatched.options)
        .forEach(flag => {
          const opt = fuzzyMatched.options[flag];
          completions.push(`--${formatStr(parser.decamelize(flag))}:${opt.description || flag}`);
        });

      process.stdout.write(completions.join('\n'));
    });
  }
}
