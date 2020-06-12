import fs from 'fs';
import path from 'path';
import Datastore from 'nedb';
import { promisify } from 'util';

interface DateItem {
  gregorian: {
    year: number,
    month: number,
    date: number,
  },
  lunar: {
    year: string,
    date: string,
    month: string,
    zodiac: string,
    solarTerm: string,
    leapMonth: boolean,
  },
  day: string,
}

const JSON_PATH = path.join(__dirname, '../data/json');

fs.unlinkSync(path.join(__dirname, '../database/nedb/default.json'));

const database = new Datastore({ filename: path.join(__dirname, '../database/nedb/default.json'), });

(async function() {
  await promisify(database.loadDatabase.bind(database))();

  await promisify(database.remove.bind(database))({}, { multi: true });

  const jsonFiles = await fs.promises.readdir(JSON_PATH);

  jsonFiles.forEach(async (jsonFile) => {
    const json = await fs.promises.readFile(path.join(JSON_PATH, jsonFile), { encoding: 'utf-8' });
    const items = JSON.parse(json) as Array<DateItem>;
    const newItems = items.map(item => {
      const { gregorian, lunar } = item;
      return {
        gregorian: gregorian,
        lunar: {
          year: lunar.year,
          month: lunar.month,
          date: lunar.date,
          leapMonth: lunar.leapMonth,
        },
        zodiac: lunar.zodiac,
        solarTerm: lunar.solarTerm,
      };
    });
    await promisify(database.insert.bind(database))(newItems);
  });

  await promisify(database.ensureIndex.bind(database))({ fieldName: 'gregorian.year' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'gregorian.month' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'gregorian.date' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'lunar.year' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'lunar.month' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'lunar.date' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'lunar.leapMonth' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'zodiac' });
  await promisify(database.ensureIndex.bind(database))({ fieldName: 'solarTerm' });

}());
