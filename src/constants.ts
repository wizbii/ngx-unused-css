import { SupportedStyleExtensions } from './config';

export const SELECTORS_TO_IGNORE = [':host', '::ng-deep'];
export const DEFAULT_STYLE_EXTENSION: SupportedStyleExtensions = 'scss';
export const REGEXP_HTML_TEMPLATE_BACK_QUOTE =
  /(?<=@Component\(\{[\s\S]*?template:\s*?`)([\s\S]*?)(?=`)/;
export const REGEXP_HTML_TEMPLATE_SINGLE_QUOTE =
  /(?<=@Component\(\{[\s\S]*?template:\s*?')([\s\S]*?)(?=')/;
export const REGEXP_SCSS_TEMPLATE_BACK_QUOTE =
  /(?<=@Component\(\{[\s\S]*?styles: \[\s*?`)([\s\S]*?)(?=`)/;
export const REGEXP_SCSS_TEMPLATE_SINGLE_QUOTE =
  /(?<=@Component\(\{[\s\S]*?styles: \[\s*?')([\s\S]*?)(?=')/;
