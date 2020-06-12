import fs from "fs";
import path from 'path';
import axios from 'axios';
import iconv from "iconv-lite";
import { from, timer } from 'rxjs';
import { tap, mergeMap, map, retry } from 'rxjs/operators';

const BASE_URL = 'http://www.hko.gov.hk/tc/gts/time/calendar/text/files/';
const OUTPUT_PATH = path.join(__dirname, '../database/origin');

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Host': 'www.hko.gov.hk',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/83.0.4103.61 Chrome/83.0.4103.61 Safari/537.36',
  },
});

const subscription = timer(0, 2000)
  .pipe(map(count => 1901 + count))
  .pipe(tap(year => {
    if(year > 1901) {
      subscription.unsubscribe();
    }
  }))
  .pipe(tap(() => console.log(`++++++++++++++++++++++++++++++++++++++++++++++++`)))
  .pipe(tap((year) => console.log(`准备抓取${ year }年数据`)))
  .pipe(mergeMap(year => {
    return from(http.get(`/T${ year }c.txt`, { responseType: 'arraybuffer' }))
      .pipe(retry(3))
      .pipe(tap(() => console.log(`正在写入${ year }年数据`)))
      .pipe(tap(response => fs.writeFileSync(path.join(OUTPUT_PATH, `${ year }.txt`), iconv.decode(response.data, 'BIG5'))))
      .pipe(tap(() => console.log(`写入${ year }年数据成功`)));
  }))
  .subscribe();
