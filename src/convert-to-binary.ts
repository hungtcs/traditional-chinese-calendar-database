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

const jsonBasePath = path.join(__dirname, '../database/json/min');

const newData = [];
for(let i=1901; i<=2100; i++) {
  const json = fs.readFileSync(path.join(jsonBasePath, `${ i }.min.json`), { encoding: 'utf-8' });
  const data = JSON.parse(json);
  data.forEach(item => {
    const { gregorian, lunar, solarTerm } = item;
    const [ gan, zhi ] = lunar.year;
    newData.push(
      gregorian.year - 1900,
      (gregorian.month << 4) + (gregorian.date >>> 1),
      (gregorian.date << 7) + (TIAN_GAN.indexOf(gan) << 3) + (DI_ZHI.indexOf(zhi) >>> 1),
      (DI_ZHI.indexOf(zhi) << 7) + ((MONTHS.indexOf(lunar.month) + 1) << 3) + ((DATES.indexOf(lunar.date) + 1) >>> 2),
      ((DATES.indexOf(lunar.date) + 1) << 6) + ((lunar.leapMonth ? 1 : 0) << 5) + (JIE_QI.indexOf(solarTerm) + 1),
    );
  });
}
fs.writeFileSync(path.join(__dirname, '../database/all.bin'), new Uint8Array(newData), { encoding: 'binary' });