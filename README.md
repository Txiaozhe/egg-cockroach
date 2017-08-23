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

* A cockroachdb plugin of eggjs.
* [GitHub](https://github.com/Txiaozhe/egg-cockroach)

## Direction

### egg version

| egg-cockroach | egg 1.x |
| ------------- | ------- |
| 1.x           | 😁      |

## Get
```shell
$ npm install egg-cockroach --save
```

## Open Plugin

```js
// config/plugin.js
exports.cockroach = {
  enable: true,
  package: 'egg-cockroach',
};
```

## Config

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

## Using

```javascript
// controller/home.js
// it is can only execute SQL  Statements now.
module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      const conn = yield app.cockroach;
      conn.query('CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);');

      console.log(conn);
      this.ctx.body = 'hi, egg';
    }
  }
  return HomeController;
};
```
## Q & A

[egg-cockroach issues](https://github.com/Txiaozhe/egg-cockroach/issues)

## License

[MIT](LICENSE)
