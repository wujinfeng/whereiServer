/**
 * Created by
 */
const BaseController = require('./BaseController');
const UserModel = require('../models/UserModel');
const config = require('../config/config');
const logger = config.logger;

class UserController extends BaseController {
    /**
     * 构造
     * @param req
     */
    constructor(req) {
        super(req);
        this.user = new UserModel();
    }

    login(req, res) {
        console.log('login:',req.body);
        let self = this;
        let code = req.body.code;
        console.log('code:',code);
        if (!code) {
            return res.json({code: 400, msg: 'code not found'});
        }
        self.user.login(code, (err, result) => {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: 'err'});
            }
            return res.json({code: 200, msg: 'ok', data: result});
        });
    }

    add(req, res) {
        let self = this;
        console.log('add:',req.body);
        let openId = req.body.openId;
        let nickName = req.body.nickName;
        console.log('openId:',openId);
        if (!openId) {
            return res.json({code: 400, msg: 'openId not found'});
        }
        let params = {openId: openId, nickName: nickName};
        self.user.add(params, (err) => {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: 'err'});
            }
            res.json({code: 200, msg: 'ok'});
        });
    }

    share(req, res) {
        let self = this;
        console.log('share:',req.body);
        let openId = req.body.openId;
        console.log('openId:',openId);
        if (!openId) {
            return res.json({code: 400, msg: 'openId not found'});
        }
        let params = {openId: openId};
        self.user.share(params, (err) => {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: 'err'});
            }
            res.json({code: 200, msg: 'ok'});
        });
    }

    location(req, res) {
        let self = this;
        console.log('location:',req.body);
        let fromOpenId = req.body.fromOpenId;
        let nickName = req.body.nickName;
        let openId = req.body.openId;
        let coordinate = req.body.coordinate;
        if (!fromOpenId || !openId || !coordinate) {
            return res.json({code: 400, msg: 'params not full'});
        }
        let params = {
            fromOpenId: fromOpenId,
            openId: openId,
            nickName: nickName,
            coordinate: coordinate,
        };
        self.user.location(params, (err) => {
            if (err) {
                logger.error(err);
                return res.json({code: 500, msg: err});
            }
            res.json({code: 200, msg: 'ok'});
        });
    }


}

module.exports = UserController;

