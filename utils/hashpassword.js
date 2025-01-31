const bcrypt = require('bcrypt');

const hashPassword = (password)=>{
        const salt = 12;
        return bcrypt.hash(password, salt);
}

const validatePassword = (password,DBpassword)=>{
    return bcrypt.compare(password,DBpassword)

}

module.exports = {hashPassword,validatePassword}