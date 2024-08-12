var db = require('../models/database');
var express = require ('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let secret = "thucan";
const saltRounds = 10; //Số lần băm pass
const maxAge = 3 * 60 * 60 * 1000; //3h Thời gian lưu token

/* GET users listing. */
//post
router.post("/register", function (req, res) {
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  let sql = "INSERT INTO khachhang SET ?";
  bcrypt.hash(password, saltRounds, function (err, hash) {
    let user_info = {
      name: name,
      password: hash,
      email: email,
      username: username,
    };
    db.query(sql, user_info, function (err, data) {
      if (err) {
        res.status(400).json({ ThongBao: `Lỗi ${err}` });
        return;
      }
      let id = data.insertId;
      res.status(201).json({ ThongBao: "Đăng ký thành công" });
    });
  });
});
//!Login
router.post("/login", async (req, res) => {
  let username = (req.body.username + "").trim();
  let pass_formuser = (req.body.password + "").trim();
  console.log(pass_formuser);
  if (username == "" || pass_formuser == "") {
    res.status(400).json({ ThongBao: "Vui lý nhap day du thong tin" });
    return;
  }
  let sql = `SELECT * FROM khachhang WHERE username = ?`;
  db.query(sql, username, async (err, data) => {
    if (err) {
      res.status(500).json({ ThongBao: `Lỗi ${err}` });
      return;
    }
    let user = data[0];
    console.log(user);
    if (user == undefined) {
      res.status(404).json({ ThongBao: "Khong tim thay user" });
      return;
    }
    let check = await bcrypt.compare(pass_formuser, user.password);
    console.log(user.password);
    console.log(check);
    if (check == false) {
      res.status(405).json({ ThongBao: "Sai mat khau" });
      return;
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      secret,
      { expiresIn: maxAge }
    );
    console.log(token);
    res.setHeader("Authorization", "Bearer " + token);
    res.json({ ThongBao: "Dang nhap thanh cong", token: token, role: user.role});
    // res.status(200).json({ ThongBao: "Dang nhap thanh cong", user: user.id });
  });
});

// router.get('/',function (req,res) {
//     let sql =`SELECT * FROM khachhang`
//     db.query(sql , function (err,data) {
//       if (err) res.json({"thông báo":`lỗi ${err}`})
//       else res.json(data)
//     })
//   })
// router.post('/luu', function(req, res) {
//     let u = req.body.username;
//     let p = req.body.password;
//     let em = req.body.email;  
    
//     var salt = bcrypt.genSaltSync(10);
//     var pass_mahoa = bcrypt.hashSync(p, salt);

//     let user_info ={username: u, password:pass_mahoa, email:em};  
//     let sql = 'INSERT INTO users SET ?';
//     db.query(sql, user_info);
//     res.redirect("/thanhvien/dangkyTC");
// })

// router.get('/dangnhap', function(req, res) {
//     res.render("dangnhap.ejs");
// });

// router.get('/dangnhapTC', function(req, res) {
//     res.render("dangnhapTC.ejs");
// });

// router.get('/admin', function(req, res) {
//     if (req.session.daDangNhap) {
//         res.render("admin.ejs",{un:req.session.username});
//      }
//      else {  
//         req.session.back= req.originalUrl;     
//         res.redirect("/thanhvien/dangnhap");
//      }
// });

// router.get('/thoat', function(req, res) {
//     req.session.destroy();
//     res.redirect("/thanhvien/dangnhap");
// });



module.exports = router