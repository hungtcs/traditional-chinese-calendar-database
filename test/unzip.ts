import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { promisify } from 'util';

(async function() {
  const deflated = await fs.promises.readFile(path.join(__dirname, '../data/json/zip/1901.zip'));
  const inflated = await promisify<zlib.InputType, Buffer>(zlib.inflate)(deflated);
  console.log(JSON.parse(inflated.toString('utf-8')));
}());
