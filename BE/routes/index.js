var db =require('../models/database')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  let sql =`SELECT *,date_format(ngayDang, '%Y-%m-%d') as ngayDang FROM thucan ORDER BY ngayDang desc;
            SELECT *,date_format(ngayDang, '%Y-%m-%d') as ngayDang FROM thucuong ORDER BY ngayDang desc
  `;
  db.query(sql ,function (err, data) {
    if (err) res.json({"Thông Báo": `lỗi ${err}`})
    else res.json(data)
  } )
});
//lấy thức ăn
router.get('/thucan',function (req,res) {
  let sql =`SELECT * FROM mon WHERE id_loai = 1`
  db.query(sql , function (err,data) {
    if (err) res.json({"thông báo":`lỗi ${err}`})
    else res.json(data)
  })
})
//lấy thức uống
router.get('/thucuong',function (req,res) {
  let sql =`SELECT * FROM mon WHERE id_loai=2`
  db.query(sql , function (err,data) {
    if (err) res.json({"thông báo":`lỗi ${err}`})
    else res.json(data)
  })
})

router.get('/mon', function(req, res, next) {
  let sql =`
          SELECT * FROM mon
  `;
  db.query(sql ,function (err, data) {
    if (err) res.json({"Thông Báo": `lỗi ${err}`})
    else res.json(data);
  } )
});

//lấy món theo id
router.get('/mon/:id', function(req, res, next) {
  let id = req.params.id;
  if (isNaN(req.params.id)==true){
    res.json({'Thông báo :':'Sai kiểu tham số'})
    return;
  }
  if (id <=0 ){
    res.json({'Thông báo :':'Sai kiểu tham số'})
    return;
  };
  let sql =`
          SELECT * FROM mon WHERE id=${id} 
  `;
  db.query(sql ,function (err, data) {
    if (err) res.json({"Thông Báo": `lỗi ${err}`})
    else res.json(data);
  } )
});

// //lấy thức uống theo id
// router.get('/thucuong/:id', function(req, res, next) {
//   let id = req.params.id;
//   if (isNaN(req.params.id)==true){
//     res.json({'Thông báo :':'Sai kiểu tham số'})
//     return;
//   }
//   if (id <=0 ){
//     res.json({'Thông báo :':'Sai kiểu tham số'})
//     return;
//   };
//   let sql =`
//           SELECT * FROM mon WHERE id=${id} AND id_loai = 2
//   `;
//   db.query(sql ,function (err, data) {
//     if (err) res.json({"Thông Báo": `lỗi ${err}`})
//     else res.json(data);
//   } )
// });

//lấy món theo loại

router.get('/mon/id_loai/:id',function (req,res) {
  let id = req.params.id;
  if (isNaN(req.params.id)==true){
    res.json({'Thông báo :':'Sai kiểu tham số'})
    return;
  }
  if (id <=0 ){
    res.json({'Thông báo :':'Sai kiểu tham số'})
    return;
  };
  let sql =`
          SELECT * FROM mon WHERE id_loai=${id}
  `;
  db.query(sql , function (err,data) {
    if (err) res.json({"thông báo":`lỗi ${err}`})
    else res.json(data)
  })
})

//lấy loại 
router.get('/loai',function (req,res) {
  let sql =`SELECT * FROM loai`
  db.query(sql , function (err,data) {
    if (err) res.json({"thông báo":`lỗi ${err}`})
    else res.json(data)
  })
})
module.exports = router;
