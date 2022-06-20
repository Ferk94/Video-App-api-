const express = require("express");
const jwt = require('jsonwebtoken');
const { User } = require("../../db");
const userControllers = require("../../controllers/userController");
const verifySignUp = require('../../middlewares/verifySignUp');
const verifyLogin = require('../../middlewares/verifyLogin');
const authentication = require("../../middlewares/authentication");

const router = express.Router();


// ruta para registrarse
router.post('/signUp', [verifySignUp.checkEmailAndPassword], userControllers.signUp)


//ruta para iniciar sesion
router.post('/login', [verifyLogin.checkUser], userControllers.login)




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