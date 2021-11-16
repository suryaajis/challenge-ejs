const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

// localhost:3000/recipes
// GET > /recipes = menampilkan data recipe dalam bentuk tabel
// GET > /recipes/add = menampilkan form penambahan recipe
// POST > /recipes/add = menambahkan recipe ke table Recipes
// GET > /recipes/:id = menampilkan detail dari recipe berdasarkan id
// GET > /recipes/:id/edit = menampilkan form edit dari recipe berdasarkan id
// POST > /recipes/:id/edit = mengubah data recipe ke database
// GET > /recipes/:id/delete = menghapus recipe berdasarkan id
// karena sudah di modular express ke router recipes maka tidak perlu /recipes => / (slash saja)

router.get('/', Controller.listRecipes )

router.get('/add', Controller.addFormRecipe )
router.post('/add', Controller.addRecipe )

router.get('/:id', Controller.detailRecipe )

router.get('/:id/edit', Controller.editFormRecipe)
router.post('/:id/edit', Controller.editRecipe)

router.get('/:id/delete', Controller.deleteRecipe )

router.get('/:id/vote', Controller.voteRecipe )







module.exports = router