import path from 'path';
import sass from 'sass';
import { pathToFileURL } from 'url';
import { InputConfig } from '../config';

/**
 * Compile styling file
 * @param {string} cssOrTsPath
 */
export default function compileSCSS(
  cssOrTsPath: string,
  config: InputConfig
): string {
  const options: sass.Options<'sync'> = {
    importers: [
      {
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url: string) {
          if (!url.startsWith('~')) return null;
          return new URL(
            path.join('node_modules', url.substring(1)),
            pathToFileURL('node_modules')
          );
        }
      }
    ],
    loadPaths: config.includePaths
  };

  if (config.importer) {
    options.importers?.push(config.importer);
  }

  const result = sass.compile(cssOrTsPath, options);

  return result.css.toString();
}
