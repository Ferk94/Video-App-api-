const axios = require('axios');
const server = require("./src/app.js");
const { conn, User, Category, Content } = require("./src/db.js");
const categoryData = require('./src/data/categoryData');
const adminUser = require('./src/data/usersData');
// const usersData = require("./src/data/usersData");
require("dotenv").config();
const { API_KEY } = process.env;




function firstIteration(l){
  let lstring = l.toString()
  if( lstring !== '9'){
    return true;
  }
  return false;
}

function secondIteration(m, l){
  let lstring = l.toString()
  let mstring = m.toString()
  if(mstring !== '9' && lstring === '9'){
    return true
  }
  return false
}

function thirdIteration(f, m, l){
  let lstring = l.toString()
  let mstring = m.toString()
  let fstring = f.toString()
  if(fstring !== '9' && mstring === '9' && lstring === '9' ){
    return true
  }
  return false
}


let data = [];
let first = 0;
let mid = 0;
let last = 1;
let index = 1;

// console.log(data, ' se me guardan las pelis?')



conn.sync({ force: true }).then( async () => {
  console.log("base de datos conectada");
  

  for(let i = 0; i < index && index !== 50 ; i++){
  
    const API = `https://www.omdbapi.com/?i=tt0000${first}${mid}${last}&apikey=${API_KEY}`
    const isTrueFirst = firstIteration(last)
    const isTrueSecond = secondIteration(mid, last)
    const isTrueThird = thirdIteration(first, mid, last)
    if(isTrueFirst === true){
      const response =  await axios.get(API)
      const apiData = response.data
      data.push(apiData)
      var number = parseInt(last)
      var suma = number + 1
      let string = suma.toString()
      last = string;
     index ++
    }
    
    if(isTrueSecond === true){
      const response =  await axios.get(API)
      const apiData = response.data
      data.push(apiData)
      var number = parseInt(mid)
      var suma = number + 1
      let string = suma.toString()
      mid = string;
      last = '0';
     
     index ++
    }

    if(isTrueThird === true){
      const response =  await axios.get(API)
      const apiData = response.data
      data.push(apiData)
      var number = parseInt(first)
      var suma = number + 1
      let string = suma.toString()
      first = string;
      mid = '0';
      last = '0';
     
     index ++
    }
    
  }
  const mapData = data.map(e => {
    return {
      title: e.Title,
      poster: e.Poster,
      released: e.Released,
      director: e.Director,
      plot: e.Plot,
      actors: e.Actors,
      country: e.Country,
      type: e.Type,
  
    }
  })
    console.log(mapData, ' q ondaaa??')
    User.create(adminUser)
    console.log('administrador precargado')
    categoryData.forEach(e => Category.create(e));
    console.log('Categorías precargadas');
    mapData.forEach(e => Content.create(e))
    console.log('peliculas precargadas!')
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  // })

  
});