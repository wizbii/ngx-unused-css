import { fs } from 'memfs';

export default {
  readFileSync: fs.readFileSync,
  readdirSync: fs.readdirSync,
  lstatSync: fs.lstatSync,
  statSync: fs.statSync
};
