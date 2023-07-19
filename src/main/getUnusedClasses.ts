import fs from 'fs';
import { Config } from '../config';
import {
  REGEXP_HTML_TEMPLATE_BACK_QUOTE,
  REGEXP_HTML_TEMPLATE_SINGLE_QUOTE
} from '../constants';
import unusedClassMapper, {
  UnusedClassesMap
} from '../helpers/unusedClassMapper';
import findHtmlOrTs from './../helpers/findHtmlOrTs';
import findUnusedCss from './findUnusedCss';

export default class UnusedClasses {
  private allHtmlContent = '';

  private readonly config: Config;

  constructor(private _config: Config) {
    this.config = _config;
  }

  async getUnusedClasses(projectPath: string): Promise<UnusedClassesMap[]> {
    const allFiles = findHtmlOrTs(projectPath);

    const allHtmlFiles = allFiles.filter((f) => f.endsWith('.html'));
    const allTsFiles = allFiles.filter((f) => f.endsWith('.ts'));

    const tsFiles = allTsFiles.filter(
      (f) => !allHtmlFiles.includes(f.replace('.ts', '.html'))
    );

    const list = [...allHtmlFiles, ...tsFiles].filter(
      (value, index, array) => array.indexOf(value) === index
    );

    const result = await this.mapClasses(list);

    return result
      .map((c) => {
        // Clear the temporary CSSfile if it was created
        if (c?.fileCreated) {
          try {
            fs.unlinkSync(c.fileCreated);
          } catch (err) {
            console.error(
              `Error deleting temporary SCSS file ${c.fileCreated}!`
            );
          }
        }

        return c?.unusedClasses;
      })
      .filter((c) => {
        const unusedCssClasses: string[] | string = c?.length ? c[0] : [];
        return unusedCssClasses && unusedCssClasses.length > 0;
      })

      .filter((c: UnusedClassesMap | undefined): c is UnusedClassesMap => !!c);
  }

  getGlobalUnusedClasses(globalStyles: string) {
    return findUnusedCss(this.allHtmlContent, globalStyles, this.config);
  }

  /**
   *
   * @param list List of html or ts files to be checked
   * @returns
   */
  private mapClasses(
    list: string[]
  ): Promise<
    ({ fileCreated?: string; unusedClasses: UnusedClassesMap } | undefined)[]
  > {
    const promiseArray = list.map((element) => {
      const htmlOrTsPath = element;
      const isTS = htmlOrTsPath.endsWith('.ts');
      let htmlContent;

      if (!isTS) {
        htmlContent = fs.readFileSync(htmlOrTsPath, 'utf8');
      } else {
        const tsContent = fs.readFileSync(htmlOrTsPath, 'utf8');

        htmlContent = (tsContent.match(REGEXP_HTML_TEMPLATE_BACK_QUOTE) ??
          tsContent.match(REGEXP_HTML_TEMPLATE_SINGLE_QUOTE))?.[1];
      }

      // Expect same path as the template except different extension.
      const cssOrTsPath = !isTS
        ? htmlOrTsPath.replace('.html', `.${this.config.styleExt}`)
        : htmlOrTsPath;

      this.allHtmlContent += htmlContent;

      return unusedClassMapper(
        cssOrTsPath,
        htmlContent,
        htmlOrTsPath,
        this.config
      );
    });

    return Promise.all(promiseArray);
  }
}
