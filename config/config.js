//环境配置

//当前环境类型 dev, qas, prd
const env = 'dev';

let config = require('./env/' + env);

module.exports = config
