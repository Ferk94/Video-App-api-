const express = require("express");

const { User } = require("../../db");

const jwt = require('jsonwebtoken');

const router = express.Router();



function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined'){
     const bearerToken = bearerHeader.split(" ")[1]
     req.token = bearerToken;
     next();
  }else {
       res.sendStatus(403)
  }
}





// ruta para registrarse
router.post("/signUp", (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, 'llegan los datos?')
  User.create({
    email,
    password
  })
    .then((newUser) => {
      jwt.sign({newUser}, 'secretkey', {expiresIn: 86400}, (err, token) => {
        res.json({newUser, token})
      })
    })
    .catch((err) => next(err));
});


//ruta para iniciar sesion
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, 'llegan los datos en el login?')
  User.findOne({
    where: {
      email: email,
      password: password,
    },
  })
    .then((usuario) => {
      const user = {
        id: usuario.id,
        name: usuario.name,
        password: usuario.password,
        role: usuario.role,
      };
      const token = jwt.sign({id: user.id}, "group8", {
        expiresIn:86400
    })
      res.json({token, user});
    })
    .catch((err) => next(err));
});




router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.json("usuario eliminado correctamente"))
    .catch((err) => next(err));
});


module.exports = router;