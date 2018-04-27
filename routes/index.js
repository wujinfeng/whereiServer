//路由主入口
module.exports = function (app) {


    app.use('/admin/user', require('./user'));   // 用户

    // not found 404 page
    app.use(function (req, res, next) {
        if (!res.headersSent) {
            res.json({code: 500, msg: '无效的接口地址',});
        }
    });
};
