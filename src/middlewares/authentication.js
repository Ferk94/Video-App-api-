const jwt = require('jsonwebtoken');
const { User } = require('../db');

const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        return res.status(403).send({ message: "No token was provided" });
      }
  
      const decoded = await jwt.verify(token, "videoApp");
      req.userId = decoded.id;
      // lo guardo en req para poder cargarlo en el req y poder usarlo en los middlewares siguientes
  
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).send({ message: "no user found" });
      }
  
      next();
    } catch (error) {
      return res.status(403).send({ message: "Unauthorized" });
    }
  };

  const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user.isAdmin) {
        console.log(user);
        return res.status(403).send({ message: "Unauthorized" });
      }
      next();
    } catch (error) {
      return res.status(403).send({ message: "Unauthorized" });
    }
  };


module.exports = {
    verifyToken,
    isAdmin
}