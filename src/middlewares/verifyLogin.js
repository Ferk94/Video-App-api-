const { User } = require("../db");
const bcrypt = require("bcryptjs");



const checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
      return (
        res
          // .status(404)
          .json({ message: "email incorrecto" })
      );
    }

    const validatePassword = async (password, newPassword) => {
        return await bcrypt.compare(password, newPassword)
    }

    const isValidPassword = validatePassword(password, user.password)

    if (!isValidPassword) {
      return (
        res
          // .status(401)
          .json({ message: "contraseña incorrecta" })
      );
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkUser,
};
