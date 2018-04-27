
const path = require('path');

module.exports = {
    port: 3001,                          // 程序运行的端口
    proxy: 'loopback, 127.0.0.1',        //信任的代理ip
    debug: false,                         // debug 为 true 时，用于本地调试，具体错误展示
    tokenSecret: 'shhhhhhardfedsecret-wujinfeng',
    mysql1: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '1234',
        database: ''
    },
    baseDb: 'wherei',
    db: {
        'wherei': 'mysql1',
    },
    upload: {
        path: path.join(__dirname, '../../public'),
        url: 'http://tick.zxbike.top',
        rootPath: '/upload/',
        fileLimit: '10 * 1024 * 1024',  //10MB
        fileMaxCount: 10
    },
    logger: require('../configLog').logger
};
