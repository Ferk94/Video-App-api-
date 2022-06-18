const { User } = require('../db');



const checkEmailAndPassword = async (req, res, next) => {
    const existingEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    });
  
    try {
  
      if (
        !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
          req.body.email
        )
      ) {
        return res.status(400).json({ message: "el email ingresado es incorrecto" });
      }
      if (existingEmail) {
        return res.status(400).json({ message: "el email ingresado ya existe" });
      }
  
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
          req.body.password
        )
      ) {
        return res.status(400).json({
          message:
            "la contraseña debe tener al menos 10 caracteres, una mayúscula, una minúscula y un @$!%*?&",
        });
      } else {
        next();
        return;
      }
    } catch (err) {
      console.log(error);
    }
  };

module.exports = {
    checkEmailAndPassword
}