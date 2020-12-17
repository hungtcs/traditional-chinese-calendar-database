/**
 * 包含公历和农历数据的类型
 *
 * @author 鸿则 <hungtcs@163.com>
 * @date 2020-12-16
 * @export
 * @class CompoundDate
 */
export declare class CompoundDate {
    year: number;
    month: number;
    date: number;
    tiangan: number;
    dizhi: number;
    lunarMonth: number;
    lunarDate: number;
    leap: boolean;
    solarTerm: number;
    constructor(year: number, month: number, date: number, tiangan: number, dizhi: number, lunarMonth: number, lunarDate: number, leap: boolean, solarTerm: number);
    getDate(): Date;
    toString(format?: 'gregorian' | 'lunar'): string;
}
