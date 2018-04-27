/**
 * 用户信息
 */

const BaseModel = require('./BaseModel');
const comm = require('../middlewares/comm');
const config = require('../config/config')

class UserModel extends BaseModel {

    login(code, cb) {
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.APPID}&secret=${config.SECRET}&js_code=${code}&grant_type=authorization_code`;
        comm.getRequest(url, (err, data) => {
            if (err) {
                cb(err);
            } else {
                console.log(data);
                if (data.openid) {
                    cb(null, {openid: data.openid, session_key : data.session_key });
                } else {
                    cb('出错' + data.errcode + data.errmsg);
                }
            }
        });
    }

    add(params, cb) {
        let self = this;
        let sql =`select id from ${self.baseDb}user where openId=?`;
        let execParam = self.getExecParamByOption(sql, params.openId);
        self.execSql(execParam, (err, row)=>{
            if(err){
                return cb(err);
            }
            if(row.length>0){
                let sql =`update ${self.baseDb}user set nickName=? where openId=?`;
                let execParam = self.getExecParamByOption(sql, [params.nickName, params.openId]);
                self.execSql(execParam, cb);
            }else {
                let sql =`insert into ${self.baseDb}user set ?`;
                let execParam = self.getExecParamByOption(sql, params);
                self.execSql(execParam, cb);
            }
        });
    }

    share(params, cb) {
        let self = this;
        let sql =`insert into ${self.baseDb}share set ?`;
        let execParam = self.getExecParamByOption(sql, params);
        self.execSql(execParam, cb);
    }

    location(params, cb){
        let self = this;
        let sql = `insert into ${self.baseDb}location set ?`;
        let execParam = self.getExecParamByOption(sql, params);
        self.execSql(execParam, cb);
    }

}

module.exports = UserModel;
