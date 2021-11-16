const pool = require('./connection')

// 1. create table chefs
// 2. create table recipes

const createTableChefs = `
CREATE TABLE "Chefs" (
  id SERIAL PRIMARY KEY,
  "fullName" VARCHAR(120) NOT NULL,
  "birthDate" DATE NOT NULL,
  "gender" VARCHAR(6) NOT NULL,
  "city" VARCHAR(20) NOT NULL
);
`

const createTableRecipes = `
CREATE TABLE "Recipes" (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  "duration" INTEGER,
  "category" VARCHAR(10),
  "createdDate" DATE,
  "notes" TEXT,
  "imageUrl" VARCHAR(50),
  "totalVote" INTEGER,
  "ChefId" INTEGER,
  FOREIGN KEY ("ChefId")
    REFERENCES "Chefs" (id)
);
`

pool.query(createTableChefs, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`Success create table Chefs`)
    pool.query(createTableRecipes, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Success create table Recipes`)
      }
    })
  }
})