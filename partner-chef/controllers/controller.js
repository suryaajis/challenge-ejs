const Model = require('../models/model')

class Controller {
  static listChefs(req, res) {
    Model.findAllChefs((err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.render('chef', {data : data})
      }
    })
  }

  static listDetailChefs(req, res) {
    Model.findDetailChefs((err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.render('chefDetail', {data: data})
      }
    })
  }

  static listRecipes(req, res) {
    Model.findAllRecipes(req.query.search, (err, data) => {
      if( err) {
        res.send(err)
      } else {
        res.render('recipe', {data: data})
      }
    })
  }

  static detailRecipe(req, res) {
    Model.findDetailRecipe(req.params.id ,(err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.render('recipeDetail', {data:data})
      }
    })
  }


  static addFormRecipe(req, res) {
    let errors
    Model.findAllChefs((err, data) => {
      if(err) {
        res.send(err)
      } else {
        if( req.query.errors ) {
          errors = req.query.errors.split(',')
        } 
        res.render('recipeAdd', {data, errors})
      }
    })
  }
  static addRecipe(req, res) {
    // POST --> proses input, passing input, query
    // let {name, duration, category, notes, imageUrl, chefName, createdDate} = req.body

    Model.addedRecipe(req.body, (err, data) => {
      if(err) {
        res.redirect(`/recipes/add?errors=${err}`)
      } else {
        res.redirect('/recipes')
      }
    })
  }


  static editFormRecipe(req, res) {
    let errors
    Model.findDetailRecipe(req.params.id, (err, dataRecipes, dataChefs) => {
      if(err) {
        res.send(err)
      } else {
        if( req.query.errors ) {
          errors = req.query.errors.split(',')
        }
        res.render('recipeEdit', {dataChefs, dataRecipes, errors})
      }
    })
  }
  static editRecipe(req, res) {
    Model.editRecipe(req.params.id ,req.body , (err, data) => {
      if(err) {
        res.redirect(`/recipes/${req.params.id}/edit?errors=${err}`)
      } else {
        res.redirect('/recipes')
      }
    })
  }


  static deleteRecipe(req, res) {
    Model.deleteRecipe(Number(req.params.id), (err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.redirect('/recipes')
      }
    })
  }

  static voteRecipe(req, res) {
    Model.addVoteRecipe(Number(req.params.id), (err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.redirect(`/recipes/${req.params.id}`)
      }
    })
  }

}




module.exports = Controller