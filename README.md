农历数据库
====

**数据来源于[香港天文台]，请遵守相关协议使用。**

提供1901年至2100年的[公历]和[农历]日期对照，包含[二十四节气]、[星期]、[十二生肖]数据。

### 数据格式

#### JSON源文件

- database/json
- database/json/min

JSON数据以每年为一个独立的文件存储，内容格式为：
```typescript
{
  // 星期
  day: string,
  // 公历日期
  gregorian: {
    year: number,
    month: number,
    date: number,
  },
  // 农历日期
  lunar: {
    year: string,
    month: string,
    date: string,
    // 是否閏月
    leapMonth: boolean,
  },
  // 生肖
  zodiac: string,
  // 节气
  solarTerm： string,
}
```

#### ZIP压缩的JSON源文件

使用`zlib`压缩的json文件，适合在浏览器端使用，体积较小，单个文件大约3.6KB。

浏览器端解压可使用[`pako`](https://github.com/nodeca/pako)库，
例子请查看：[browser-unzip.html](./examples/browser-unzip.html)

#### JSON数据库（nedb）

JSON数据库为NEDB数据库，请使用NEDB数据库读取，示例代码为：
```typescript
const database = new Datastore({ filename: 'path/to/default.json' });
await promisify(database.loadDatabase.bind(database))();
const result = await promisify(database.find.bind(database))({
  'gregorian.year': 2020,
  'gregorian.month': 6,
  'gregorian.date': 12,
});
console.log(result);
```


[星期]: https://zh.wikipedia.org/wiki/%E6%98%9F%E6%9C%9F
[公历]: https://zh.wikipedia.org/wiki/%E6%A0%BC%E9%87%8C%E6%9B%86
[农历]: https://zh.wikipedia.org/zh/%E8%BE%B2%E6%9B%86
[十二生肖]: https://zh.wikipedia.org/wiki/%E7%94%9F%E8%82%96
[二十四节气]: https://zh.wikipedia.org/wiki/%E8%8A%82%E6%B0%94
[香港天文台]: https://www.hko.gov.hk/tc/index.html
