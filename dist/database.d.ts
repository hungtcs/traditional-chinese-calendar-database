import { CompoundDate } from "./compound-date";
import { FindCondition } from "./find-condition";
export interface DatabaseLoadOptions {
    parseAll?: boolean;
}
export declare class Database {
    loaded: boolean;
    private _arrayBuffer;
    private compoundDates;
    private get arrayBuffer();
    private set arrayBuffer(value);
    load(binary?: string, options?: DatabaseLoadOptions): Promise<ArrayBuffer>;
    getCompoundDate(year: number, month: number, date: number): CompoundDate;
    find(condition: FindCondition | ((date: CompoundDate) => boolean)): CompoundDate[];
    private slice;
    parseAll(): void;
}
