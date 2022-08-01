农历数据库
====

**数据来源于[香港天文台]，请遵守相关协议使用。**

提供1901年至2100年的[公历]和[农历]日期对照，包含[二十四节气]、[星期]、[十二生肖]数据。

---

JSON文件由 [database/origin](database/origin) 中的文本文件解析转换来的，转换之后的数据我没有仔细校验，如果发现数据不准确，可以自己对原文件进行转换。

---


### 使用方式
```html
<main id="content"></main>
<section id="json"></section>
<script src="../dist/index.esm.js" type="module"></script>
<script type="module">
  import { Database } from '../dist/index.esm.js';
  const database = new Database();
  database.load('../database/all.bin')
    .then(data => {
      const now = new Date();
      const date = database.getCompoundDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
      document.querySelector('#content').innerHTML = `今天是：${ date.toString() }`;
      document.querySelector('#json').innerHTML = `<pre>${ JSON.stringify(date, null, 2) }</pre>`;
    });
</script>
```

[示例](https://hungtcs.github.io/traditional-chinese-calendar-database/examples/index.html)

### 数据格式

#### database/all.json.zip

包含1901年到2100年的数据，使用zlib压缩，大小为639KB。

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
  solarTerm: string,
}
```

#### ZIP压缩的JSON源文件

使用`zlib`压缩的json文件，适合在浏览器端使用，体积较小，单个文件大约3.6KB。

浏览器端解压可使用[`pako`](https://github.com/nodeca/pako)库，
例子请查看：[browser-unzip.html](./examples/browser-unzip.html)

[星期]: https://zh.wikipedia.org/wiki/%E6%98%9F%E6%9C%9F
[公历]: https://zh.wikipedia.org/wiki/%E6%A0%BC%E9%87%8C%E6%9B%86
[农历]: https://zh.wikipedia.org/zh/%E8%BE%B2%E6%9B%86
[十二生肖]: https://zh.wikipedia.org/wiki/%E7%94%9F%E8%82%96
[二十四节气]: https://zh.wikipedia.org/wiki/%E8%8A%82%E6%B0%94
[香港天文台]: https://www.hko.gov.hk/tc/index.html
