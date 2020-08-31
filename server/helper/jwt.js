const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (user)=>{
    const acces_token = jwt.sign({email:user.name},secret)
    return acces_token
}

module.exports = generateToken