
export class GanZhi {
  public static TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  public static DI_ZHI =   ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  public static ZODIAC =   ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];
  public static MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  public static GAN_ZHI = [
    '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
    '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
    '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
    '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
    '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
    '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
  ];
  public static JIE_QI = [
    '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
    '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒',
  ];

  public static prev(ganzhi: string): string {
    if(this.GAN_ZHI.indexOf(ganzhi) === 0) {
      return this.GAN_ZHI[this.GAN_ZHI.length - 1];
    }
    else {
      return this.GAN_ZHI[this.GAN_ZHI.indexOf(ganzhi) - 1];
    }
  }

  public static next(ganzhi: string): string {
    if(this.GAN_ZHI.indexOf(ganzhi) === this.GAN_ZHI.length - 1) {
      return this.GAN_ZHI[0];
    } else {
      return this.GAN_ZHI[this.GAN_ZHI.indexOf(ganzhi) + 1];
    }
  }

  public static prevZodiac(zodiac: string): string {
    if(this.ZODIAC.indexOf(zodiac) === 0) {
      return this.ZODIAC[this.ZODIAC.length - 1];
    }
    else {
      return this.ZODIAC[this.ZODIAC.indexOf(zodiac) - 1];
    }
  }

  public static prevMonth(month: string): string {
    if(month.startsWith('閏')) {
      return month.substring(1);
    }
    if(this.MONTHS.indexOf(month) === 0) {
      return this.MONTHS[this.MONTHS.length - 1];
    }
    else {
      return this.MONTHS[this.MONTHS.indexOf(month) - 1];
    }
  }

}
