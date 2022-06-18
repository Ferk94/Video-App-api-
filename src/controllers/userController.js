const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../db');



const signUp = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email, 'llega el dato?')
        let userByEmail = await User.findOne({
            where: {
                email: email
            }
        });
        let token;
        if(userByEmail){
            res.status(400).send('El email ya está en uso')
        }else {

            const hashPassword = async (password) => {
                const salt = await bcrypt.genSalt(10);
                return await bcrypt.hash(password, salt)
            }

            let newUser = await new User({
                email: email,
                password: hashPassword(password)
            })
            let userSaved = await newUser.save();
            token = await jwt.sign({id: userSaved._id}, 'videoApp', {
                expiresIn:86400
            });

            res.status(200).json({token, email, password})
        }


    }catch(err){
        console.error(err)
    }
    
}

const login = (req, res) => {
    try {
        const {email, password} = req.body;
        let user = User.findOne({
            where: {
                email: email,
                password: password
            }
        }) 
        if(!user){
            res.status(400).json({message: 'email o contraseña incorrectas'})
        }else {
            const token = jwt.sign({id: user._id}, 'videoApp', {
                expiresIn: 86400
            });
            
            res.status(200).json({token, email: user.email, password:user.password})
        }
    }catch(err){
        console.error(err)
    }
}

module.exports = {
    signUp,
    login
}