import path from 'path';
import Datastore from 'nedb';
import { promisify } from 'util';

const database = new Datastore({ filename: path.join(__dirname, '../database/nedb/default.json') });

(async function() {
  await promisify(database.loadDatabase.bind(database))();

  {
    const result = await promisify(database.find.bind(database))({
      'gregorian.year': 2020,
      'gregorian.month': 6,
      'gregorian.date': 12,
    });
    console.log(result);
  }
  {
    const result = await promisify(database.find.bind(database))({
      'gregorian.year': 2020,
      'lunar.month': '四月',
      'lunar.date': '廿一',
    });
    console.log(result);
  }


}());
