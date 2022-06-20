const axios = require('axios');
const server = require("./src/app.js");
const { conn, User, Category } = require("./src/db.js");
const categoryData = require('./src/data/categoryData');
// const usersData = require("./src/data/usersData");
require("dotenv").config();
const { API_KEY } = process.env;




function firstIteration(numberString){
  if(numberString[0] === '0' && numberString[1] === '0' && numberString[2] !== '9'){
    return true;
  }
  return false;
}

// function isntNine(numberString){
//   if(numberString[0] === '0' && numberString[1] === '0' && parseInt(numberString[2]) < 9){
//     return true
//   }
//   return false;
// }




let data = [];
let lastDigits = '001';
let index = 1;

console.log(data, ' se me guardan las pelis?')

conn.sync({ force: true }).then( async () => {
  console.log("base de datos conectada");
  
  console.log(lastDigits, 'subio el valor?')

  for(let i = 0; i < index && index !== 5 ; i++){
  
    const API = `https://www.omdbapi.com/?i=tt0000${lastDigits}&apikey=${API_KEY}`
    const isTrue = firstIteration(lastDigits)
    if(isTrue === true){
      const response =  await axios.get(API)
      const apiData = response.data
      data.push(apiData)
      var number = parseInt(lastDigits[2])
      console.log(number, 'el ultimo digito')
      var suma = number + 1
      let string = suma.toString()
      console.log(string, 'q onda con el string a insertar?')
      console.log(suma, ' sube el valor?')
     lastDigits.replace(lastDigits[2], string )
     console.log(lastDigits, ' q onda con el string de afuera?')
     index ++
    }
    
    
    
  }
  console.log(data, 'q onda con la data')
  console.log(index, 'va subiendo el index?')

    categoryData.forEach(e => Category.create(e));
    console.log('Categorías precargadas');
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  // })

  
});