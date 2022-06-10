const express = require("express");

const { User } = require("../../db");

const router = express.Router();

router.post("/", (req, res, next) => {
  const { name, password } = req.body;
  User.create({
    name,
    password
  })
    .then((newUser) => res.json(newUser))
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

router.get("/:name/:password", (req, res, next) => {
  const { name, password } = req.params;
  User.findOne({
    where: {
      name: name,
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
      res.json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;