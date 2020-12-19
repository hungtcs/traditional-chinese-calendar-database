import { CompoundDate } from "./compound-date";
import { FindCondition } from "./find-condition";
export interface DatabaseLoadOptions {
    parseAll?: boolean;
}
export declare class Database {
    loaded: boolean;
    protected _arrayBuffer: ArrayBuffer | null;
    protected compoundDates: Array<CompoundDate>;
    protected get arrayBuffer(): ArrayBuffer;
    protected set arrayBuffer(buffer: ArrayBuffer);
    load(binary?: string, options?: DatabaseLoadOptions): Promise<ArrayBuffer>;
    getCompoundDate(year: number, month: number, date: number): CompoundDate;
    find(condition: FindCondition | ((date: CompoundDate) => boolean)): CompoundDate[];
    protected slice(offset: number): CompoundDate;
    parseAll(): void;
}
