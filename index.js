const server = require("./src/app.js");
const { conn, User, Category } = require("./src/db.js");
const categoryData = require('./src/data/categoryData');
// const usersData = require("./src/data/usersData");

conn.sync({ force: true }).then(() => {
  console.log("base de datos conectada");
//   usersData.forEach((e) => User.create(e));
//   console.log("usuarios precargados");
  categoryData.forEach(e => Category.create(e));
  console.log('Categorías precargadas');
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});