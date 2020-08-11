const toRegister = require("../models/register_model");
const loginAction = require("../models/login_model");

const CheckService = require("../service/member_check");
const encryption = require("../models/encryption.js");

check = new CheckService();

module.exports = class Member {
  // 會員註冊
  postRegister(req, res, next) {
    // 進行加密
    const password = encryption(req.body.password);
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      create_date: onTime(),
    };
    // 檢核 email 格式正確性
    const checkEmail = check.checkEmail(memberData.email);
    // 不符合email格式
    if (checkEmail === false) {
      res.json({
        result: {
          status: "註冊失敗",
          err: "請輸入正確的 Email 格式（xxx@gmail.com）",
        },
      });
    }
    // 若符合email格式
    else if (checkEmail === true) {
      // 將資料寫入資料庫
      toRegister(memberData).then(
        (result) => {
          // 若寫入成功則回傳
          res.json({
            status: "註冊成功。",
            result: result,
          });
        },
        (err) => {
          // 若寫入失敗則回傳
          res.json({
            result: err,
          });
        }
      );
    }
  }

  // 會員登入
  postLogin(req, res, next) {
    // 進行加密
    const password = encryption(req.body.password);
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      create_date: onTime(),
    };
    // 檢核 email 格式正確性
    const checkEmail = check.checkEmail(memberData.email);
    // 不符合email格式
    if (checkEmail === false) {
      res.json({
        result: {
          status: "登入失敗",
          err: "請輸入正確的 Email 格式（xxx@gmail.com）",
        },
      });
    }

    loginAction(memberData).then((rows) => {
      if (check.checkNull(rows) === true) {
        res.json({
          result: {
            status: "登入失敗。",
            err: "請輸入正確的帳號或密碼。",
          },
        });
      } else if (check.checkNull(rows) === false) {
        res.json({
          result: {
            status: "登入成功。",
            loginMember: "歡迎 " + rows[0].name + " 的登入！",
          },
        });
      }
    });
  }
};

//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  return [
    date.getFullYear(),
    "-" + (mm > 9 ? "" : "0") + mm,
    "-" + (dd > 9 ? "" : "0") + dd,
    " " + (hh > 9 ? "" : "0") + hh,
    ":" + (mi > 9 ? "" : "0") + mi,
    ":" + (ss > 9 ? "" : "0") + ss,
  ].join("");
};
