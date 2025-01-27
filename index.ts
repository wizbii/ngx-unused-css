#! /usr/bin/env node

/*
Find unused css inside Angular components
*/
import fs from 'fs';
import meow from 'meow';
import path from 'path';
import { InputConfig } from './src/config';
import init from './src/init';

const defaultConfigPath = '.ngx-unused-css.json';

const cli = meow(
  `
	Usage
	  $ ngx-unused-css

	Options
	  --config, -c override default config path

	Examples
	  $ ngx-unused-css --config ngx-custom-unused-css.json
`,
  {
    flags: {
      config: {
        type: 'string',
        alias: 'c'
      }
    }
  }
);

let config: InputConfig;

if (cli.flags.init) {
  init();
} else {
  if (cli.flags.config) {
    config = require(path.join(__dirname, cli.flags.config));
  } else if (fs.existsSync(path.resolve(defaultConfigPath))) {
    config = require(path.resolve(defaultConfigPath));
  } else {
    throw new Error(
      'Config not found, did you forgot to run ngx-unused-css --init?'
    );
  }

  // Use dynamic import so config is initialized on every import
  const mainPromise = import('./src/main');
  mainPromise.then((res) => {
    // Bootstrap library
    // eslint-disable-next-line
    new res.default(config);
  });
}
