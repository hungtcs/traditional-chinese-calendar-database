import fs from 'fs';
import path from 'path';

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI =   ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const DATES =  [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
];
const JIE_QI = [
  '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
  '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒',
];

interface DateItem {
  gregorian: {
    year: number,
    month: number,
    date: number,
  },
  lunar: {
    year: string,
    date: string,
    month: string,
    leapMonth: boolean,
  },
  day: string,
  zodiac: string,
  solarTerm: string,
}

const json = fs.readFileSync(path.join(__dirname, '../database/all.json'), { encoding: 'utf-8' });
const data: Array<DateItem> = JSON.parse(json);

const collection: Array<{ losm: number, lemo: number, lems: number, fdgd: number, fdgm: number, fdgy: number }> = [];
const collection2: Array<Array<{ gan: number, zhi: number, fdgd: number, fdgm: number, fdgy: number }>> = [];

let last: DateItem = null;
let leapMonth: DateItem = null;
for(let [_, item] of Object.entries(data)) {
  const { gregorian, lunar, solarTerm } = item;
  if(solarTerm) {
    const [gan, zhi] = lunar.year;
    if(solarTerm === '立春') {
      collection2.push([
        {
          fdgy: gregorian.year,
          fdgm: gregorian.month,
          fdgd: gregorian.date,
          gan: TIAN_GAN.indexOf(gan),
          zhi: DI_ZHI.indexOf(zhi),
        },
      ])
    } else {
      const current = collection2.pop();
      if(current) {
        current.push({
          fdgy: gregorian.year,
          fdgm: gregorian.month,
          fdgd: gregorian.date,
          gan: TIAN_GAN.indexOf(gan),
          zhi: DI_ZHI.indexOf(zhi),
        });
        collection2.push(current);
      }
    }
  }

  if(lunar.leapMonth) {
    leapMonth = item;
  } else {
    if(lunar.month === '正月' && lunar.date === '初一') {
      const current = collection.pop();
      if(current !== undefined) {
        current.losm = (current.losm << 1) + ((DATES.indexOf(last.lunar.date) + 1) === 30 ? 1 : 0);
        collection.push(current);
      }
      collection.push({
        losm: 0x00,
        lemo: 0,
        lems: 0,
        fdgd: gregorian.date,
        fdgm: gregorian.month,
        fdgy: gregorian.year - 1901,
      });
    } else if(lunar.date === '初一') {
      const current = collection.pop();
      if(current !== undefined) {
        current.losm = (current.losm << 1) + ((DATES.indexOf(last.lunar.date) + 1) === 30 ? 1 : 0);
        if(leapMonth) {
          current.lemo = MONTHS.indexOf(leapMonth.lunar.month.substr(1)) + 1;
          current.lems = (DATES.indexOf(leapMonth.lunar.date) + 1) === 30 ? 1 : 0;
          leapMonth = null;
        }
        collection.push(current);
      }
    }
  }
  last = item;
}

const array = [];

// 节气
collection2.forEach((year, yearIndex) => {
  if(yearIndex === 199 && year.length === 22) {
    year.push(
      { fdgy: 2100, fdgm: 0, fdgd: 0, gan: 0, zhi: 0 },
      { fdgy: 2100, fdgm: 0, fdgd: 0, gan: 0, zhi: 0 },
    );
  }
  year.forEach((jieqi, index) => {
    const { gan, zhi, fdgy, fdgm, fdgd } = jieqi;
    if(index === 0) {
      array.push((gan << 4) + zhi);
    }
    array.push(fdgy - 1901, fdgm, fdgd);
  });
});

console.log(array.length);


// 月份
collection.forEach(year => {
  const { losm, lemo, lems, fdgy, fdgm, fdgd } = year;
  array.push(
    losm >>> 4,
    (losm << 8) + lemo,
    (lems << 7) + (fdgd >>> 4),
    (fdgd << 1) + fdgm,
    fdgy,
  );
});

const uint8Array = new Uint8Array(array);

console.log(uint8Array.byteLength);

fs.writeFileSync(path.join(__dirname, '../database/all-v2.bin'), new Uint8Array(uint8Array), { encoding: 'binary' });
