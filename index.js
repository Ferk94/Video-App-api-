const axios = require('axios');
const server = require("./src/app.js");
const { conn, User, Category } = require("./src/db.js");
const categoryData = require('./src/data/categoryData');
// const usersData = require("./src/data/usersData");
require("dotenv").config();
const { API_KEY } = process.env;

const API = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`

conn.sync({ force: true }).then(() => {
  console.log("base de datos conectada");
  // axios.get(API)
  // .then(response => {
    // var data = response.data;
    // console.log(data, 'q hay aca?')
    categoryData.forEach(e => Category.create(e));
    console.log('Categorías precargadas');
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  // })

  
});