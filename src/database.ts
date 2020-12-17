import { CompoundDate } from "./compound-date";
import { FindCondition } from "./find-condition";

export interface DatabaseLoadOptions {
  parseAll?: boolean;
}

export class Database {
  public loaded: boolean = false;
  private _arrayBuffer: ArrayBuffer | null = null;
  private compoundDates: Array<CompoundDate> = [];

  private get arrayBuffer() {
    if(this.loaded) {
      return this._arrayBuffer;
    } else {
      throw new Error('please call load function before getting buffer');
    }
  };
  private set arrayBuffer(buffer) { this._arrayBuffer = buffer; }

  public async load(binary: string, options: DatabaseLoadOptions = {}): Promise<ArrayBuffer> {
    const isNodeJS = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    let arrayBuffer: ArrayBuffer;
    if(isNodeJS) {
      const fs = require('fs');
      const buffer: Buffer = await fs.promises.readFile(binary);
      arrayBuffer = new ArrayBuffer(buffer.length);
      const view = new Uint8Array(arrayBuffer);
      for(let i = 0, length = buffer.length; i < length; i++) {
        view[i] = buffer[i];
      }
    } else {
      const response = await fetch(binary)
      arrayBuffer = await response.arrayBuffer();
    }
    this.arrayBuffer = arrayBuffer;
    this.loaded = true;
    options.parseAll && this.parseAll();
    return arrayBuffer;
  }

  public getCompoundDate(year: number, month: number, date: number) {
    const offset = (new Date(year, month - 1, date).getTime() - new Date(1901, 0, 1).getTime()) / (1000 * 60 * 60 * 24) * 5;
    return this.slice(offset);
  }

  public find(condition: FindCondition | ((date: CompoundDate) => boolean)) {
    if(typeof(condition) === 'function') {
      return this.compoundDates.filter(date => condition(date));
    } else {
      return this.compoundDates.filter(date => {
        return Array.from(Object.entries(condition)).every(([key, value]) => date[key] === value);
      });
    }
  }

  private slice(offset: number) {
    const dataView = new DataView(this.arrayBuffer, offset, 5);
    const [byte0, byte1, byte2, byte3, byte4] = [dataView.getUint8(0), dataView.getUint8(1), dataView.getUint8(2), dataView.getUint8(3), dataView.getUint8(4)];
    return new CompoundDate(
      byte0 + 1900,
      byte1 >>> 4,
      ((byte1 & 0x0F) << 1) + (byte2 >>> 7),
      ((byte2 >>> 3) & 0x0F),
      ((byte2 << 1) & 0x0F) + (byte3 >>> 7),
      (byte3 & 0x7F) >>> 3,
      ((byte3 & 0x07) << 2) + (byte4 >>> 6),
      ((byte4 >>> 5) & 0x01) === 0x01,
      byte4 & 0x1F,
    );
  }

  public parseAll() {
    this.compoundDates.length = 0;
    for(let i = 0, length = this.arrayBuffer.byteLength; i < length; i += 5) {
      this.compoundDates.push(this.slice(i));
    }
  }

}
