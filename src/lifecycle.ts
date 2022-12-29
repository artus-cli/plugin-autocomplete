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
      const argv: string[] = ctx.args.getCompletionArgv;
      if (!argv) return next();

      const formatStr = str => str.replace(/:/, '\\:');
      const { fuzzyMatched, matched } = this.parsedCommands.matchCommand(argv.slice(1));
      const completions: string[] = [];

      if (matched) {
        Object.keys(matched.options)
          .forEach(flag => {
            const opt = matched.options[flag];
            completions.push(`--${formatStr(parser.decamelize(flag))}:${opt.description || flag}`);
          });
      } else if (fuzzyMatched) {
        fuzzyMatched.childs
          .forEach(({ cmd, description }) => {
            completions.push(`${formatStr(cmd)}:${description}`);
          });
      }

      process.stdout.write(completions.join('\n'));
    });
  }
}
