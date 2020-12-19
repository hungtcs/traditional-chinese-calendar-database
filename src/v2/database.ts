import { Constants } from "src/constants";
import { CompoundDate } from "../compound-date";
import { DatabaseLoadOptions, Database as DatabaseV1 } from "../database";

export class Database extends DatabaseV1 {
  private dates = [];

  public async load(binary?: string, options: DatabaseLoadOptions = { parseAll: true }): Promise<ArrayBuffer> {
    const isNodeJS = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    if(isNodeJS) {
      const path = require('path');
      return super.load(binary ?? path.join(__dirname, '../database/all-v2.bin'), options);
    } else {
      return super.load(binary, options);
    }
  }

  public getCompoundDate(year: number, month: number, date: number) {
    const offset = (new Date(year, month - 1, date).getTime() - new Date(1901, 0, 1).getTime()) / (1000 * 60 * 60 * 24) * 5;
    return this.slice(offset);
  }

  public parseAll() {
    // 节气
    console.log(this.arrayBuffer);

    const yJieqiLength = (1 + 3 * 24);
    for(let yi = 0, length = 200;  yi < length; yi++) {
      const dataView = new DataView(this.arrayBuffer);

      const yearJieqiIndex = yi * yJieqiLength;
      const gan = dataView.getUint8(yearJieqiIndex) >>> 4;
      const zhi = dataView.getUint8(yearJieqiIndex) & 0x0F;

      console.log(Constants.TIAN_GAN[gan], Constants.DI_ZHI[zhi]);

      for(let jqIndex =0, length = 24; jqIndex < length; jqIndex++) {
        const jieqiIndex = yearJieqiIndex + 1 + jqIndex * 3;
        const year = dataView.getUint8(jieqiIndex);
        const month = dataView.getUint8(jieqiIndex+1);
        const date = dataView.getUint8(jieqiIndex+2);
        console.log(Constants.JIE_QI[jqIndex], year, month, date);
      }



    }
  }

}
