const fs = require('fs')
const {Chef, ChefDetailDuration, Recipe, RecipeDetail} = require('./class')
const pool = require('../configs/connection')

class Model {
  static findAllChefs(cb) {
    let queryChefs = `
    select * from "Chefs"
    order by "fullName" asc
    `

    pool.query(queryChefs, (err, res) => {
      if(err) {
        cb(err)
      } else {

        let chefInstances = res.rows.map(({id, fullName, birthDate, gender, city}) => {
          return new Chef(id, fullName, birthDate, gender, city)
        })

        cb(null, chefInstances)
      }
    })
  }

  static findDetailChefs(cb) {
    let queryDetailChefs =`
    select c.*, cast(avg(r.duration) as float) as "averageDuration",
    min(r.duration) as "minDuration", max(r.duration) as "maxDuration"
    from "Recipes" r 
    join "Chefs" c ON r."ChefId" = c.id 
    group by c.id 
    order by c."fullName" 
    `

    pool.query(queryDetailChefs, (err, res) => {
      if(err) {
        cb(err)
      } else {
        let chefDetailInstances = res.rows.map(({id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration}) => {
          return new ChefDetailDuration(id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration)
        })

        cb(null, chefDetailInstances)
      }
    })
  }

  static findAllRecipes(searchRecipe, cb) {
    if (searchRecipe === undefined) {
      let queryRecipes = `
      select id, "name", "duration", "category", "totalVote" from "Recipes"
      order by "totalVote" desc
      `

      pool.query(queryRecipes, (err, res) => {
        if(err) {
          cb(err)
        } else {
          let recipeInstances = res.rows.map(({id, name, duration, category, totalVote}) => {
            return new Recipe(id, name, duration, category, totalVote)
          })
  
          cb(null, recipeInstances)
        }
      })
    } else {
      let filterQueryRecipes = `
      select * from "Recipes" r 
      where lower("name") like '%${searchRecipe.toLowerCase()}%'
      order by "totalVote" desc
      `
     pool.query(filterQueryRecipes, (err, res) => {
       if(err) {
         cb(err)
       } else {
        let recipeInstances = res.rows.map(({id, name, duration, category, totalVote}) => {
          return new Recipe(id, name, duration, category, totalVote)
        })

        cb(null, recipeInstances)
       }
     })
    }
  }

  static findDetailRecipe(id, cb) {
    let queryDetailRecipe = `
    select r.*, c."fullName" from "Recipes" r 
    join "Chefs" c on r."ChefId" = c.id 
    `

    pool.query(queryDetailRecipe, (err, res) => {
      if(err) {
        cb(err)
      } else {
        res.rows = res.rows.map(({id, name, duration, category, createdDate, notes, imageUrl, totalVote, ChefId, fullName}) => {
          return new RecipeDetail(id, name, duration, category, totalVote, createdDate, notes, imageUrl, ChefId, fullName)
        })
        
        let selectedRecipe;
        res.rows = res.rows.filter(recipe => {
          if (id == recipe.id) {
            selectedRecipe = recipe
          }
        })

        
        Model.findAllChefs((err, dataChefs) => {
          if (err) {
            cb(err)
          } else {
            cb(null, selectedRecipe, dataChefs)
          }  
        })
      }
    })
  }


  static addedRecipe(newRecipe, cb) {
    let {name, duration, category, notes, imageUrl, ChefId, createdDate} = newRecipe

    let insertQueryRecipe = `
    insert into "Recipes" 
    ("name", "duration", "category", "createdDate", "notes", "imageUrl", "totalVote", "ChefId")
    values ('${name}', ${duration}, '${category}', '${createdDate}', '${notes}', '${imageUrl}', 0, ${ChefId});
    `

    let listErrors = Model.validation(newRecipe)
    
    if ( listErrors.length > 0) {
      cb(listErrors)
    } else {
      pool.query(insertQueryRecipe, (err, res) => {
        if(err) {
          cb(err)
        } else {
          cb(null, res.rows)
        }
      })
    }
  }
  

  static editRecipe(id, editRecipe, cb) {
    let {name, duration, category, notes, imageUrl, ChefId, createdDate} = editRecipe

    let editQueryRecipe = `
    UPDATE "Recipes" 
    SET "name" = '${name}', duration = ${Number(duration)}, category = '${category}', "createdDate" = '${createdDate}',
      "notes" = '${notes}', "imageUrl" = '${imageUrl}', "ChefId" = ${Number(ChefId)}
    WHERE id = ${id}; 
    `
    let listErrors = Model.validation(editRecipe)

    if ( listErrors.length > 0) {
      cb(listErrors)
    } else {
      pool.query(editQueryRecipe, (err, res) => {
        if(err) {
          cb(err)
        } else {
          cb(null)
        }
      })
    }
  }


  static deleteRecipe(id, cb) {
    let deleteQueryRecipe = `
    DELETE FROM "Recipes" 
    WHERE id = ${id};
    `

    pool.query(deleteQueryRecipe, (err, res) => {
      if(err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }


  static addVoteRecipe(id, cb) {
    let selectQueryRecipe = `
    select * from "Recipes"
    where id = ${id}
    `

    pool.query(selectQueryRecipe, (err, res) => {
      if(err) {
        cb(err)
      } else {

        let addVoteQueryRecipe = `
        update "Recipes"
        set "totalVote" = ${res.rows[0].totalVote} + 1
        where id = ${id}
        `
        pool.query(addVoteQueryRecipe, (err, res) => {
          if(err) {
            cb(err)
          } else {
            cb(null)
          }
        })
      }
    })
  }

  static validation(data) {
    let listErrors = []
    let today = new Date();
    let newCreatedDate = new Date(data.createdDate)

    if (!data.name) {
      listErrors.push('Name is required!')
    } else if(data.name.length === 0) {
      listErrors.push('Please fill your name')
    } else if ( data.name.length > 100 ) {
      listErrors.push('Recipe name maximum character is 100')
    }

    if ( !data.duration ) {
      listErrors.push('Duration is required!')
    } else if(data.duration < 1) {
      listErrors.push('Minimum duration is a minute')
    }

    if ( !data.category ) {
      listErrors.push('Category is required!')
    }

    if( !data.imageUrl ) {
      listErrors.push('ImageUrl is required!')
    } else if(data.imageUrl.length > 50) {
      listErrors.push('Image URL name maximum character is 50')
    }

    if ( !data.createdDate ) {
      listErrors.push('Created date is required!')
    } else if(data.createdDate.length === 0 ) {
      listErrors.push('Please add your created date')
    } else if ( newCreatedDate > today) {
      listErrors.push('Maximum date is today')
    }

    if ( !data.ChefId ) {
      listErrors.push('Chef is required!')
    }

    if ( !data.notes ) {
      listErrors.push('Notes is required.')
    } else if(data.notes.length <= 10 ) {
      listErrors.push('Minimum word in notes is 10')
    }

    return listErrors
  }
}


module.exports = Model