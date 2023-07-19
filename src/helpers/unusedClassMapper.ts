import fs from 'fs';
import { Config } from '../config';
import {
  REGEXP_SCSS_TEMPLATE_BACK_QUOTE,
  REGEXP_SCSS_TEMPLATE_SINGLE_QUOTE
} from '../constants';
import findUnusedCss from '../main/findUnusedCss';

type UnusedClasses = string[]; // Return class names as array of strings
export type UnusedClassesMap = [UnusedClasses, string]; // Second string is actual html file where unused classes were found

/**
 * Returns array of classes/attributes not used in html
 *
 * @param cssOrTsPath - styling file path
 * @param htmlContent - html content to analyse
 * @param htmlOrTsPath - html file path
 * @returns Promise<([string[], string])>
 */
export default async function unusedClassMapper(
  cssOrTsPath: string,
  htmlContent: string | undefined,
  htmlOrTsPath: string,
  config: Config
): Promise<
  { fileCreated?: string; unusedClasses: UnusedClassesMap } | undefined
> {
  if (!htmlContent) {
    return undefined;
  }

  let fileCreated;

  const isTS = cssOrTsPath.endsWith('.ts');
  const cssPath = isTS
    ? cssOrTsPath.replace('.ts', `.${config.styleExt}`)
    : cssOrTsPath;

  try {
    // Try to read css file
    fs.readFileSync(cssPath);
  } catch (error) {
    if (isTS) {
      // Try to read ts file if there is no css file
      const tsContent = fs.readFileSync(cssOrTsPath, 'utf8');
      const cssContent = (tsContent.match(REGEXP_SCSS_TEMPLATE_BACK_QUOTE) ??
        tsContent.match(REGEXP_SCSS_TEMPLATE_SINGLE_QUOTE))?.[1];

      // If there is css content
      if (cssContent) {
        fileCreated = cssPath;
        // Create a css file with the same content as style in the ts file
        fs.writeFileSync(cssPath, cssContent);
      } else {
        console.error(
          `Styling for component ${htmlOrTsPath} not found, skipping...`
        );
        return undefined;
      }
    } else {
      const tsPath = cssOrTsPath.replace(`.${config.styleExt}`, '.ts');
      const tsContent = fs.readFileSync(tsPath, 'utf8');
      const cssContent = (tsContent.match(REGEXP_SCSS_TEMPLATE_BACK_QUOTE) ??
        tsContent.match(REGEXP_SCSS_TEMPLATE_SINGLE_QUOTE))?.[1];

      // If there is css content
      if (cssContent) {
        fileCreated = cssPath;
        // Create a css file with the same content as style in the ts file
        fs.writeFileSync(cssPath, cssContent);
      } else {
        console.error(
          `Styling for component ${htmlOrTsPath} not found, skipping...`
        );
        return undefined;
      }
    }
  }

  try {
    // Try to read css file
    fs.readFileSync(cssPath);
  } catch (error) {
    throw new Error(`ERROR: Styling for component ${htmlOrTsPath} not found !`);
  }

  const classes = await findUnusedCss(htmlContent, cssPath, config);
  return { fileCreated, unusedClasses: [classes, htmlOrTsPath] };
}
