# egg-cockroach

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-cockroach.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-cockroach
[travis-image]: https://img.shields.io/travis/eggjs/egg-cockroach.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-cockroach
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-cockroach.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-cockroach?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-cockroach.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-cockroach
[snyk-image]: https://snyk.io/test/npm/egg-cockroach/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-cockroach
[download-image]: https://img.shields.io/npm/dm/egg-cockroach.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-cockroach

* cockroachdb 的 eggjs 插件
* [GitHub](https://github.com/Txiaozhe/egg-cockroach)

## 依赖说明

### 依赖的 egg 版本

| egg-cockroach 版本 | egg 2.x |
| ---------------- | ------- |
| 2.x              | 😁      |

## 获取插件
```shell
$ npm install egg-cockroach --save
```

## 开启插件

```js
// config/plugin.js
exports.cockroach = {
  enable: true,
  package: 'egg-cockroach',
};
```

## 配置

```javascript
exports.cockroach = {
  client: {
    user: 'root',
    host: '127.0.0.1',
    database: 'user',
    port: 26257,
  },
  app: true,
  agent: false,
};
```

## 使用

```javascript
// controller/home.js
// 目前只做了直接执行 SQL 语句的用法，以后会逐渐完善
class HomeController extends Controller {
  async index() {
    const [err, conn, done] = await this.app.cockroach;
    if(err) {
      console.log(err);
    } else {
      const time = await conn.query('select now() as currentTime;');
      console.log(time.rows[0].currenttime);
      const res = await conn.query('SELECT * FROM accounts;');
      console.log(res);
      await done();
    }
    this.ctx.body = 'hi, egg';
  }
}
```
## 提问交流

请到 [egg-cockroach issues](https://github.com/Txiaozhe/egg-cockroach/issues) 异步交流。

## License

[MIT](LICENSE)
