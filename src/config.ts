import { FileImporter, Importer } from 'sass';
import { SetRequired } from 'type-fest';

export interface Ignore {
  file: string;
  all?: boolean;
  selectors?: string[];
}

export type SupportedStyleExtensions = 'scss' | 'sass' | 'css';

export interface InputConfig {
  path: string;
  styleExt?: SupportedStyleExtensions;
  ignore: (string | Ignore)[];
  importer?: Importer<'sync'> | FileImporter<'sync'>;
  includePaths?: string[];
  globalStyles?: string;
}

export type Config = SetRequired<InputConfig, 'styleExt'>;
