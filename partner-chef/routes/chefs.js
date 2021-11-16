const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

// localhost:3000/chefs
// 1. /chefs = menampilkan data chef dalam bentuk tabel
// 2. /chefs/detail = menampilkan data chefs dengan informasi duration
// Jika sudah di modular express melalui router maka tidak perlu /chefs => / (slash saja)

router.get('/', Controller.listChefs)

router.get('/detail', Controller.listDetailChefs)




module.exports = router