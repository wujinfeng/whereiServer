const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


// 后台登录
router.post('/login', function (req, res, next) {
    new UserController(req).login(req, res, next);
});

// 转发
router.post('/add', function (req, res, next) {
    new UserController(req).add(req, res, next);
});


// 转发
router.post('/share', function (req, res, next) {
    new UserController(req).share(req, res, next);
});

// 位置
router.post('/location', function (req, res, next) {
    new UserController(req).location(req, res, next);
});



module.exports = router;