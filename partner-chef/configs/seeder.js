const pool = require('./connection')
const fs = require('fs')

// 1. insert data chef
// 2. insert data recipes
// 3. Initialization

const dataChefs = JSON.parse(fs.readFileSync('../data/chefs.json', 'utf-8'))
const dataRecipes = JSON.parse(fs.readFileSync('../data/recipes.json', 'utf-8'))

// ==== Insert Data Chefs ====
let insertChefsQuery = `
INSERT INTO "Chefs" ("fullName", "birthDate", "gender", "city")
VALUES `

dataChefs.forEach((chef, index) => {
  let {fullName, birthDate, gender, city} = chef
  if( index === dataChefs.length - 1) {
    insertChefsQuery += `('${fullName}', '${birthDate}', '${gender}', '${city}');`
  } else {
    insertChefsQuery += `('${fullName}', '${birthDate}', '${gender}', '${city}'), `
  }
})


// ==== Insert Data Recipes ====
let insertRecipesQuery = `
INSERT INTO "Recipes" ("name", "duration", "category", "createdDate", "notes", "imageUrl", "totalVote", "ChefId") 
VALUES `

dataRecipes.forEach((recipe, index) => {
  let {name, duration, category, createdDate, notes, imageUrl, totalVote, ChefId} = recipe

  if( index === dataRecipes.length - 1) {
    insertRecipesQuery += `('${name}', ${duration}, '${category}', '${createdDate}', '${notes}', '${imageUrl}', ${totalVote}, ${ChefId});`
  } else {
    insertRecipesQuery += `('${name}', ${duration}, '${category}', '${createdDate}', '${notes}', '${imageUrl}', ${totalVote}, ${ChefId}), `
  }
})


// ==== Initialization ====
pool.query(insertChefsQuery, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Success insert data chefs`)
    pool.query(insertRecipesQuery, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Success insert data recipes`)
      }
    })
  }
})