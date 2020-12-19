class Constants {
}
Constants.TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
Constants.DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
Constants.ZODIAC = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
Constants.GAN_ZHI = [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
];
Constants.LUNAR_MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
Constants.LUNAR_MONTHS_ALIAS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
Constants.LUNAR_DATES = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
];
Constants.JIE_QI = [
    '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
    '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒',
];

/**
 * 包含公历和农历数据的类型
 *
 * @author 鸿则 <hungtcs@163.com>
 * @date 2020-12-16
 * @export
 * @class CompoundDate
 */
class CompoundDate {
    constructor(year, month, date, tiangan, dizhi, lunarMonth, lunarDate, leap, solarTerm) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.tiangan = tiangan;
        this.dizhi = dizhi;
        this.lunarMonth = lunarMonth;
        this.lunarDate = lunarDate;
        this.leap = leap;
        this.solarTerm = solarTerm;
    }
    getDate() {
        const date = new Date(0);
        return (date.setFullYear(this.year),
            date.setMonth(this.month - 1),
            date.setDate(this.date),
            date);
    }
    toString(format) {
        if (format === 'gregorian') {
            return `${this.year}年${this.month.toString().padStart(2)}月${this.date.toString().padStart(2)}日`;
        }
        else if (format === 'lunar') {
            return `${Constants.TIAN_GAN[this.tiangan]}${Constants.DI_ZHI[this.dizhi]}` +
                `${Constants.ZODIAC[this.dizhi]}年 ${Constants.LUNAR_MONTHS_ALIAS[this.lunarMonth - 1]}` +
                `${Constants.LUNAR_DATES[this.lunarDate - 1]}` +
                `${this.solarTerm ? ` ${Constants.JIE_QI[this.solarTerm - 1]}` : ''}`;
        }
        else {
            return `公历 ${this.year}年${this.month.toString().padStart(2)}月${this.date.toString().padStart(2)}日 ` +
                `农历 ${Constants.TIAN_GAN[this.tiangan]}${Constants.DI_ZHI[this.dizhi]}` +
                `${Constants.ZODIAC[this.dizhi]}年 ${this.leap ? '閏' : ''}${Constants.LUNAR_MONTHS_ALIAS[this.lunarMonth - 1]}` +
                `${Constants.LUNAR_DATES[this.lunarDate - 1]}` +
                `${this.solarTerm ? ` ${Constants.JIE_QI[this.solarTerm - 1]}` : ''}`;
        }
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Database {
    constructor() {
        this.loaded = false;
        this._arrayBuffer = null;
        this.compoundDates = [];
    }
    get arrayBuffer() {
        if (this.loaded) {
            return this._arrayBuffer;
        }
        else {
            throw new Error('please call load function before getting buffer');
        }
    }
    ;
    set arrayBuffer(buffer) { this._arrayBuffer = buffer; }
    load(binary, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const isNodeJS = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
            let arrayBuffer;
            if (isNodeJS) {
                const fs = require('fs');
                const path = require('path');
                const buffer = yield fs.promises.readFile(binary !== null && binary !== void 0 ? binary : path.join(__dirname, '../database/all.bin'));
                arrayBuffer = new ArrayBuffer(buffer.length);
                const view = new Uint8Array(arrayBuffer);
                for (let i = 0, length = buffer.length; i < length; i++) {
                    view[i] = buffer[i];
                }
            }
            else {
                const response = yield fetch(binary !== null && binary !== void 0 ? binary : 'all.bin');
                arrayBuffer = yield response.arrayBuffer();
            }
            this.arrayBuffer = arrayBuffer;
            this.loaded = true;
            options.parseAll && this.parseAll();
            return arrayBuffer;
        });
    }
    getCompoundDate(year, month, date) {
        const offset = (new Date(year, month - 1, date).getTime() - new Date(1901, 0, 1).getTime()) / (1000 * 60 * 60 * 24) * 5;
        return this.slice(offset);
    }
    find(condition) {
        if (typeof (condition) === 'function') {
            return this.compoundDates.filter(date => condition(date));
        }
        else {
            return this.compoundDates.filter(date => {
                return Array.from(Object.entries(condition)).every(([key, value]) => date[key] === value);
            });
        }
    }
    slice(offset) {
        const dataView = new DataView(this.arrayBuffer, offset, 5);
        const [byte0, byte1, byte2, byte3, byte4] = [dataView.getUint8(0), dataView.getUint8(1), dataView.getUint8(2), dataView.getUint8(3), dataView.getUint8(4)];
        return new CompoundDate(byte0 + 1900, byte1 >>> 4, ((byte1 & 0x0F) << 1) + (byte2 >>> 7), ((byte2 >>> 3) & 0x0F), ((byte2 << 1) & 0x0F) + (byte3 >>> 7), (byte3 & 0x7F) >>> 3, ((byte3 & 0x07) << 2) + (byte4 >>> 6), ((byte4 >>> 5) & 0x01) === 0x01, byte4 & 0x1F);
    }
    parseAll() {
        this.compoundDates.length = 0;
        for (let i = 0, length = this.arrayBuffer.byteLength; i < length; i += 5) {
            this.compoundDates.push(this.slice(i));
        }
    }
}

class Database$1 extends Database {
    constructor() {
        super(...arguments);
        this.dates = [];
    }
    load(binary, options = { parseAll: true }) {
        const _super = Object.create(null, {
            load: { get: () => super.load }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const isNodeJS = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
            if (isNodeJS) {
                const path = require('path');
                return _super.load.call(this, binary !== null && binary !== void 0 ? binary : path.join(__dirname, '../database/all-v2.bin'), options);
            }
            else {
                return _super.load.call(this, binary, options);
            }
        });
    }
    getCompoundDate(year, month, date) {
        const offset = (new Date(year, month - 1, date).getTime() - new Date(1901, 0, 1).getTime()) / (1000 * 60 * 60 * 24) * 5;
        return this.slice(offset);
    }
    parseAll() {
        // 节气
        console.log(this.arrayBuffer);
        const yJieqiLength = (1 + 3 * 24);
        for (let yi = 0, length = 200; yi < length; yi++) {
            const dataView = new DataView(this.arrayBuffer);
            const yearJieqiIndex = yi * yJieqiLength;
            const gan = dataView.getUint8(yearJieqiIndex) >>> 4;
            const zhi = dataView.getUint8(yearJieqiIndex) & 0x0F;
            console.log(Constants.TIAN_GAN[gan], Constants.DI_ZHI[zhi]);
            for (let jqIndex = 0, length = 24; jqIndex < length; jqIndex++) {
                const jieqiIndex = yearJieqiIndex + 1 + jqIndex * 3;
                const year = dataView.getUint8(jieqiIndex);
                const month = dataView.getUint8(jieqiIndex + 1);
                const date = dataView.getUint8(jieqiIndex + 2);
                console.log(Constants.JIE_QI[jqIndex], year, month, date);
            }
        }
    }
}

export { CompoundDate, Constants, Database, Database$1 as DatabaseV2 };
//# sourceMappingURL=index.esm.js.map
