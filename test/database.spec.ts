import path from 'path';
import { Database } from '..';

describe('Database', () => {
  let database: Database;

  beforeAll(async (done) => {
    database = new Database();
    await database.load(path.join(__dirname, '../database/all.bin'));
    done();
  });

  it('database should be loaded', () => {
    expect(database.loaded).toBe(true);
  });

  it('公历2020年12月17日是农历庚子鼠年冬月初三', () => {
    const date = database.getCompoundDate(2020, 12, 17);
    expect(date.tiangan).toBe(6);
    expect(date.dizhi).toBe(0);
    expect(date.lunarMonth).toBe(11);
    expect(date.lunarDate).toBe(3);
    expect(date.leap).toBe(false);
    expect(date.solarTerm).toBe(0);
  });

  it('1997年的生肖应该是牛', () => {
    expect(database.find({ year: 1997 }).every(item => item.dizhi === 1)).toBe(true);
  });

});