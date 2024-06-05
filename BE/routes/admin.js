var db =require('../models/database')
var express = require('express');
var router = express.Router();

/* GET home page. */
//lấy thức ăn
router.get('/mon',function (req,res) {
  let sql =`SELECT *,date_format(ngayDang, '%Y-%m-%d') as ngayDang FROM mon`
  db.query(sql , function (err,data) {
    if (err) res.json({"thông báo":`lỗi ${err}`})
    else res.json(data)
  })
})


//thêm món
router.post('/mon/add', function (req,res) {
  let data = req.body;
  let sql = `INSERT INTO mon SET ?`;
  db.query(sql, data,function (err, d) {
      if (err) res.json({'thông báo':`Lỗi ${err}`})
      else res.json({"thông báo": ` đã thêm thành công `})
  })
})

//sửa
router.put('/mon/:id',function (req,res) {
  let id = req.params.id;
  if (isNaN(id)==true) {
      res.json({'thông báo':`Lỗi ${err}`})
      return;
  }
  let data = req.body;
  let sql=`UPDATE mon SET ? WHERE id = ?`;
  db.query(sql,[data,id] ,function (err,d) {
      if (err) res.json({'thông báo':`Lỗi ${err}`})
      else res.json({"thông báo": ` đã cập nhật thành công `})
  })
})

//xóa
router.delete('/mon/:id',function (req ,res) {
  let id = req.params.id;
  if (isNaN(id)==true) {
      res.json({'thông báo':`Lỗi ${err}`})
      return;
  }
  let sql=`DELETE FROM mon WHERE id = ?`;
  db.query(sql,id ,function (err,d) {
      if (err) res.json({'thông báo':`Lỗi ${err}`})
      else res.json({"thông báo": ` đã xóa thành công `})
  })
})




module.exports = router;
