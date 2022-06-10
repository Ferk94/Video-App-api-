const express = require("express");

const { Content } = require("../../db");

const router = express.Router();

router.post("/", (req, res, next) => {
  const { name, type, size, data } = req.body;
  Content.create({
    name,
    type,
    size,
    data
  })
    .then((newContent) => res.json(newContent))
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Content.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.json("contenido eliminado correctamente"))
    .catch((err) => next(err));
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Content.findOne({
    where: {
      id: id
    },
  })
    .then((contenido) => {
      const content = {
        id: contenido.id,
        name: contenido.name,
        type: contenido.type,
        size: contenido.size,
        data: contenido.data
      };
      res.json(content);
    })
    .catch((err) => next(err));
});

module.exports = router;