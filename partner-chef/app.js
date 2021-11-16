/**
 * STEP
 * 1. Require
 * 2. Set View Engine
 * 3. Middleware
 * 4. Listen
 */
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

// jika menggunakan file ejs di Views perlu di set
app.set('view engine', 'ejs')


// Middleware untuk terima input
app.use(express.urlencoded({extended : false}))


// routes ke "/"
app.use('/', routes)


// Listen untuk menjalankan app
app.listen(port, () => {
  console.log(`This app listening on port:`, port)
})

module.exports = routes







// const dataChefs = JSON.parse(fs.readFileSync('./data/chefs.json'))
//   let tableData = ``

//   for (let i = 0; i < dataChefs.length; i++) {
//     tableData += `
//     <tr style="background-color:rgb(242, 242, 242);">
//       <td>${dataChefs[i].id}</td>
//       <td>${dataChefs[i].fullName}</td>
//       <td>${dataChefs[i].birthDate}</td>
//       <td>${dataChefs[i].gender}</td>
//       <td>${dataChefs[i].city}</td>
//     </tr>`
//   }
  
