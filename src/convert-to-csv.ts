import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import generate from 'csv-generate';
import stringify from 'csv-stringify';
import { GanZhi } from '../test/ganzhi';
import { promisify } from 'util';
import { stdout } from 'process';
import { pipeline, Readable } from 'stream';

const BASE_DIR = path.join(__dirname, '../database/origin');

interface DateItem {
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDate: number,
  lunarYear: string,
  lunarDate: string,
  lunarMonth: string,
  lunarLeapMonth: boolean,
  day: string,
  zodiac: string,
  solarTerm: string,
}

(async function() {
  const files = (await fs.promises.readdir(BASE_DIR)).map(file => path.join(BASE_DIR, file));

  const dates = (await Promise.all(
    files.map(async (file) => {
      const content = await fs.promises.readFile(file, { encoding: 'utf-8' });
      const dates = parseOriginData(content);
      return dates;
    }),
  )).flat();

  function fromArray(array: Array<any>) {
    var readable = new Readable({ objectMode: true });
    readable._read = function () {
      for (var index = 0; index < array.length; index += 1) {
        readable.push(array[index]);
      }
      readable.push(null);
    };
    return readable;
  };

  fromArray(dates)
  .pipe(stringify({ header: true }))
  .pipe(zlib.createGzip({ level: 9 }))
  .pipe(fs.createWriteStream(path.join(__dirname, '../database/all.csv.zip')));

}());

function parseOriginData(content: string) {
  let dates: Array<DateItem> = new Array();
  const lines = content.split(/\n/).map(line => line.trim()).filter(line => !!line);
  let { year, chronology, zodiac } = lines[0].match(/^(?<year>(\d{4}))\((?<chronology>\S{2})\s*-\s*肖(?<zodiac>(\S{1}))/).groups;
  let lichun: boolean = false;
  let runyue: boolean = false;
  let lunarMonth: string;
  let firstLunarMonth: string;
  for(let index=2; index < lines.length - 1; index++) {
    const line = lines[index];
    try {
      let { year, month, date, lunarDate, day, solarTerm } = line.match(/(?<year>(\d{4}))年(?<month>(\d{1,2}))月(?<date>(\d{1,2}))日\s+(?<lunarDate>(\S+))\s+(?<day>(\S+))(\s+)?(?<solarTerm>(\S+))?/).groups;
      month = month.replace(/^0*/, '');
      date = date.replace(/^0*/, '');
      if(solarTerm === '立春') {
        lichun = true;
      }
      if(/^(?!閏)\S+月$/.test(lunarDate)) {
        lunarMonth = lunarDate;
        lunarDate = '初一';
        runyue = false;
        firstLunarMonth || (firstLunarMonth = lunarMonth);
      }
      if(/^閏\S+月$/.test(lunarDate)) {
        lunarMonth = lunarDate;
        lunarDate = '初一';
        runyue = true;
        firstLunarMonth || (firstLunarMonth = lunarMonth);
      }
      dates.push({
        day: day,
        gregorianYear: Number.parseInt(year),
        gregorianMonth: Number.parseInt(month),
        gregorianDate: Number.parseInt(date),
        lunarYear: lichun ? chronology : GanZhi.prev(chronology),
        lunarMonth: lunarMonth,
        lunarDate: lunarDate,
        lunarLeapMonth: runyue,
        solarTerm: solarTerm,
        zodiac: lichun ? zodiac : GanZhi.prevZodiac(zodiac),
      });
    } catch(err) {
      console.log(line);
      console.error(err);
      process.exit(1);
    }
  }

  const missingLunarMonth = GanZhi.prevMonth(firstLunarMonth)
  dates = dates.map(item => {
    if(item.lunarMonth) {
      return item;
    } else {
      item.lunarMonth = missingLunarMonth;
      return item;
    }
  });

  return dates;
}
