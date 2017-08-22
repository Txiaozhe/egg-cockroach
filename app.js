'use strict';

const pg = require('pg');

module.exports = app => {
  app.addSingleton('cockroach', createCockroach);
};

/**
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 Cockroach 实例
 */
function* createCockroach(config, app) {
  const pool = new pg.Pool(config);

  app.beforeStart(function* () {
    app.coreLogger.info(`[egg-cockroach] instance status OK ${new Date()}`);
  });

  return yield pool.connect();
}
