// index.js adalah pusat router ke router yg lain
// route home atau landing page awal
const express = require('express')
const router = express.Router()
const chefs = require('./chefs')
const recipes = require('./recipes')



router.get("/", (req, res) => {
  // menghubungkan dengan page ejs menggunakan res.render
  res.render('home', {})
})

// connect ke route lain
router.use('/chefs', chefs)
router.use('/recipes', recipes)







module.exports = router