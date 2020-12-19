import { CompoundDate } from "../compound-date";
import { DatabaseLoadOptions, Database as DatabaseV1 } from "../database";
export declare class Database extends DatabaseV1 {
    private dates;
    load(binary?: string, options?: DatabaseLoadOptions): Promise<ArrayBuffer>;
    getCompoundDate(year: number, month: number, date: number): CompoundDate;
    parseAll(): void;
}
