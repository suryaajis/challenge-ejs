# **Step Express MVC**

1. **INSTALLATION**
    * npm init -y
    * npm install pg express ejs
    * npm i -D nodemon
2. **CREATE SKELTON FOLDER**
    * Data
    * Model View Controller
    * Config ( Connection, Setup, Seeder)
    * Routes
3. **POOL (Connection)**
    * require (pg)
    * instanciate pool (user, host, db, pass, port)
    * module.exports
4. **SETUP (Create Table Database)**
    * require (pool from connection)
    * assign query sql to **CREATE TABLE <database> ( column data-type constrainst)**
    * pool query callback
5. **SEEDER (Insert Data)**
    * require (pool from connection)
    * assign database readfilesync .json with JSON.parse
    * assign query sql to **INSERT INTO <database> (column) VALUES (value from column)** // _databse.forEach_
    * pool query callback
6. **APP EXPRESS (app.js)**
    * require (express, assign express(), port, routes=routes/index.js)
    * set **view engine** with **ejs**
    * middlewrae => *app.use(express.urlencoded({extended: false}))*
    * routes => *app.use('/', routes)*
    * listen
    * module.exports
7. **ROUTING EXPRESS (Routes)**
    * index.js --> home or main router
      * require (express, assign express.Router(), other route)
      * app.get('/') = to show homepage
      * app.use = to connect other route
    * etc.js --> other router connect with main
      * require (express, assign express.Router(), controller)
      * app.get('/etc') = to show etc page
      * app.post('/etc') = to operate value in form page
    * module.exports every route
8. **CONTROLLER**
    * require Model
    * assign static class Controller from router
    * Request and Respone router show in Controller
      * req.params to get parameter in address 
      (/:params)
      * req.query to get value of object in address 
      (/?query=....) => {query:....}
      * res.send to show string in page
      * res.render to send data in page EJS (views)
      * res.redirect to move in address localhost
    * connect with *Model* every operation with *async* send err/data to Respone Controller
    * module.exports
9. **CLASS**
    * Create Class to Instanciate every Data in Model
    * module.exports
10. **MODEL**
    * require (class, pool from connection)
    * assign static class Model from Controller
      * create query
      * pool query
    * assign static class validation (optional)
    * module.exports
11. **VIEWS EJS**
    * Foleder Partials => Set repeat syntax html in ejs (ex: header, navbar, footer)
      * *<% %> = untuk logic tanpa output*
      * *<%- %> = untuk memasukan/include partials ejs* 
      * *<%= %> = untuk menampilkan output*
      * *<%# %> = untuk comment ejs*
    * home.ejs => html css for homepage with ejs
    * etc.ejs => html css for other page with ejs

> ALL STEPS COMPLETE