/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/08/22        Tang Xiaoji
 */

'use strict';

const assert = require('assert');
const pg = require('pg');

module.exports = app => {
  app.addSingleton('cockroach', createOneClient);
};

/**
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 Cockroach 实例
 */
async function createOneClient(config, app) {
  assert(config.host && config.port && config.user && config.database,
    `[egg-cockroach] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);

  app.coreLogger.info('[egg-cockroach] connecting %s@%s:%s/%s',
    config.user, config.host, config.port, config.database);

  const pool = new pg.Pool(config);

  return new Promise((resolve) => {
    pool.connect((err, client, done) => {
      if(err) {
        resolve([err]);
      } else {
        client.query('select now() as currentTime;', (err, res) => {
          if (err) {
            app.coreLogger.info(`[egg-cockroach] instance init FAILED: ${err}`);
            resolve([err]);
          } else {
            app.coreLogger.info(`[egg-cockroach] instance status OK ${res.rows[0].currenttime}`);
            resolve([null, client, done]);
          }
        });
      }
    });
  });
}
