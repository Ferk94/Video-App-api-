const { ADMIN } = require("../enums/enums");

require("dotenv").config()

const { ADMIN_EMAIL } = process.env;
const adminUser = {
    email: ADMIN_EMAIL,
    password: 'Fer49318862@',
    role: 'admin'
}

module.exports = adminUser;