import fs from 'fs';
import path from 'path';

// source: https://gist.github.com/victorsollozzo/4134793

/**
 * Find all htmls in the project
 *
 * @param base
 * @param ext
 * @param files
 * @param result
 * @returns
 */
function _findHtmlOrTs(
  base: string,
  ext: 'html' | 'ts',
  files?: string[],
  result?: string[]
): string[] {
  if (!base) {
    return [];
  }
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach((file) => {
    const newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = _findHtmlOrTs(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (
        file.substr(-1 * (ext.length + 1)) === '.' + ext &&
        file.includes('component') &&
        !file.includes('component.spec')
      ) {
        result?.push(newbase);
      }
    }
  });

  return result;
}

export default function findHtmlOrTs(base: string): string[] {
  return [..._findHtmlOrTs(base, 'ts'), ..._findHtmlOrTs(base, 'html')];
}
