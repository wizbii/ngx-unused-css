import { PurgeCSS } from 'purgecss';
import { InputConfig } from '../config';
import parseNgClass from '../helpers/parseNgClass';
import whitelist from '../helpers/whitelist';
import compileSCSS from './compileSCSS';

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssOrTsPath
 */
export default async function findUnusedCss(
  content: string,
  cssOrTsPath: string,
  config: InputConfig
) {
  const css = compileSCSS(cssOrTsPath, config);

  const html = parseNgClass(content);

  const options = {
    content: [
      {
        raw: html,
        extension: 'html'
      }
    ],
    css: [{ raw: css }],
    rejected: true
  };

  const purgecssResult = await new PurgeCSS().purge(options);
  const result = purgecssResult[0].rejected || [];

  return whitelist(result, cssOrTsPath, config.ignore, config.path);
}
