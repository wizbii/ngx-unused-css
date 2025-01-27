import chalk from 'chalk';
import { table } from 'table';
import { Config, InputConfig } from './config';
import { DEFAULT_STYLE_EXTENSION } from './constants';
import { UnusedClassesMap } from './helpers/unusedClassMapper';
import UnusedClasses from './main/getUnusedClasses';

export default class Main {
  private readonly config: Config;

  constructor(config: InputConfig) {
    this.config = {
      ...config,
      ...(config.styleExt
        ? { styleExt: config.styleExt }
        : { styleExt: DEFAULT_STYLE_EXTENSION })
    };

    this.run()
      .then((r) => {
        const res = r.css;

        if (r.globalCss.length > 0) {
          res.push([r.globalCss, '***** GLOBAL UNUSED CSS *****']);
        }

        if (res.length > 0) {
          this.log(res);
        } else {
          console.log('No duplicate classes were found!');
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async run(): Promise<{
    css: UnusedClassesMap[];
    globalCss: string[];
  }> {
    try {
      const unusedClasses = new UnusedClasses(this.config);

      const css = await unusedClasses.getUnusedClasses(this.config.path);

      const globalCss =
        (this.config.globalStyles &&
          (await unusedClasses.getGlobalUnusedClasses(
            this.config.globalStyles
          ))) ||
        [];

      return { css, globalCss };
    } catch (e) {
      throw new Error(e as string);
    }
  }

  private log(classes: UnusedClassesMap[]) {
    let result = chalk.red.bold(
      'Unused CSS classes were found for the following files:\n\n'
    );

    classes.forEach((e: [string[], string]) => {
      const htmlPath = e[1];
      const cssPath = e[1].replace('.html', '.scss');

      result += chalk.red(htmlPath) + '\n';
      result += chalk.red.bold(cssPath) + '\n';

      const cssClasses = e[0].join('\n');

      result += table([[chalk.green(cssClasses)]]);
    });

    console.log(result);

    process.exit(1);
  }
}
