# **STEP SEQUELIZE MVC EXPRESS**

1. **INSTALLATION**
    * npm init -y
    * npm install pg express ejs sequelize
    * npm i -D nodemon sequelize-cli
2. **CREATE SKELTON FOLDER**
    * npx sequelize init / sequelize init (config, migration, models, seeder)
    * Routes, Controllers, Views
    * Data
3. **CONFIG (Connection / Create Database)**
    * set (username, pswrd, db, host, dialect)
4. **MIGRATION and MODELS (Generate Migration and Models)**
    * npx sequelize model:generate --name <-Tabel-> --attributes key:datatype,key:datatype,... 
    * MIGRATION
        * return queryInterface.createTable() and qI.dropTable()
        * npx sequelize db:migrate
        * set Models for Foreign Key (if Any)
    * MODELS 
        * set Foreign Key
        * set perubahan migration jika ada
5. **SEEDER (Insert Data)**
    * npx sequelize seed:generate --name <'nama seeder'>
    * ambil data => JSON.parse(fs.readFileSync(path, encode))
    * forEach data => menambah createdAt & updatedAt serta menghapus/delete id di file json jika ada
    * return queryInterface.bulkInsert('Tabel', data, options), qI.bulkDelete('Tabel', null, {})
    * npx sequelize db:seed --seed <'seedname'> / db:seed:all
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
    * require Model => const {Model Name} = require(models/index)
    * assign static class Controller from router
    * Request and Respone router show in Controller
      * req.params to get parameter in address 
      (/:params)
      * req.query to get value of object in address 
      (/?query=....) => {query:....}
      * res.send to show string in page
      * res.render to send data in page EJS (views)
      * res.redirect to move in address localhost
    * Use sequelize promis to get Model Operation
        * Model.findAll({}) = get all data from Model selected
        * Model.findOne({where:}) = get one of data from Model with option where
        * Model.findByPk(id, {option}) = get data from Primary Key
        * etc
        * use option include: [] => to see relation from Model
    * module.exports
10. **MODEL**
    * check Associate
    * Set Instance Method and Static Method
    * Set Hooks 
        * beforeCreate, afterCreate
    * Set Validate
        * validate notEmpty, isEmail
        * custom validate
11. **VIEWS EJS**
    * Foleder Partials => Set repeat syntax html in ejs (ex: header, navbar, footer)
      * *<% %> = untuk logic tanpa output*
      * *<%- %> = untuk memasukan/include partials ejs* 
      * *<%= %> = untuk menampilkan output*
      * *<%# %> = untuk comment ejs*
    * home.ejs => html css for homepage with ejs
    * etc.ejs => html css for other page with ejs

> ALL STEPS COMPLETE

