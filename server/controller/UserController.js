const {User} = require('../models')
const {generateToken} = require('../helper/jwt')
const compare = require('../helper/compare')

require('dotenv').config()

class Controller{
    static register(req,res,next){
        let user = {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        let hidePass = {
            username:req.body.username,
            email:req.body.email,
        }
        User.create(user)
        .then(data=>{
            return res.status(201).json(hidePass)
        })
        .catch(err=>{
            console.log(err)
            return next(err)
        })
    }
    static login(req,res,next){
        let options = {where:{email:req.body.email}}
        User.findOne(options)
        .then(data=>{
            if (data){
                let isValid = compare(req.body.password, data.password)
                if (isValid){
                    const access_token = generateToken(data)
                    return res.status(200).json({access_token})

                }else{
                    throw ({message:`email / password salah`,status:400})    
                }

            } else{
                throw ({message:`email / password salah`,status:400})
            }
        })
        .catch(err=>{
            return next(err)
        })
    }
}

module.exports = Controller