import { CompoundDate } from '..';

describe('CompoundDate', () => {

  it('shouled be created', () => {
    expect(new CompoundDate(2020, 12, 17, 6, 0, 11, 3, false, 0)).toBeDefined();
  });

  it('toString shouled be correct', () => {
    expect(new CompoundDate(2020, 12, 17, 6, 0, 11, 3, false, 0).toString()).toEqual('公历 2020年12月17日 农历 庚子鼠年 冬月初三');
  });

});