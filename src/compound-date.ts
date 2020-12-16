import { Constants } from './constants';

/**
 * 包含公历和农历数据的类型
 *
 * @author 鸿则 <hungtcs@163.com>
 * @date 2020-12-16
 * @export
 * @class CompoundDate
 */
export class CompoundDate {

  constructor(
      public year: number,
      public month: number,
      public date: number,
      public tiangan: number,
      public dizhi: number,
      public lunarMonth: number,
      public lunarDate: number,
      public leap: boolean,
      public solarTerm: number) {

  }

  public getDate() {
    const date = new Date(0);
    return (
      date.setFullYear(this.year),
      date.setMonth(this.month - 1),
      date.setDate(this.date),
      date
    );
  }

  public toString(format?: 'gregorian'|'lunar') {
    if(format === 'gregorian') {
      return `${ this.year }年${ this.month.toString().padStart(2) }月${ this.date.toString().padStart(2) }日`;
    }
    else if(format === 'lunar') {
      return `${ Constants.TIAN_GAN[this.tiangan] }${ Constants.DI_ZHI[this.dizhi] }`+
             `${ Constants.ZODIAC[this.dizhi] }年 ${ Constants.LUNAR_MONTHS_ALIAS[this.lunarMonth - 1] }`+
             `${ Constants.LUNAR_DATES[this.lunarDate - 1] }`+
             `${ this.solarTerm ? ` ${ Constants.JIE_QI[this.solarTerm - 1] }` : '' }`;
    }
    else {
      return `公历 ${ this.year }年${ this.month.toString().padStart(2) }月${ this.date.toString().padStart(2) }日 ` +
             `农历 ${ Constants.TIAN_GAN[this.tiangan] }${ Constants.DI_ZHI[this.dizhi] }`+
             `${ Constants.ZODIAC[this.dizhi] }年 ${ this.leap ? '閏' : '' }${ Constants.LUNAR_MONTHS_ALIAS[this.lunarMonth-1] }`+
             `${ Constants.LUNAR_DATES[this.lunarDate-1] }`+
             `${ this.solarTerm ? ` ${ Constants.JIE_QI[this.solarTerm - 1] }` : '' }`;
    }
  }

}
