const {User} = require('../models')
const bcrypt = require('bcryptjs')
const generateToken = require('../helper/jwt')
const compare = require('../helper/compare')
require('dotenv').config()

class Controller{
    static register(req,res){
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
            return res.status(400).json({message:`something error`})
        })
    }
    static login(req,res){
        let options = {where:{email:req.body.email}}
        User.findOne(options)
        .then(data=>{
            if (data){
                let isValid = compare(req.body.password, data.password)
                if (isValid){
                    const acces_token = generateToken(data)
                    return res.status(200).json({acces_token})

                }else{
                    res.status(404).json({message:`email / password salah`})    
                }

            } else{
                res.status(404).json({message:`email / password salah`})
            }
        })
        .catch(err=>{
            return res.status(500).json({message:`internal server error`})
        })
    }
}

module.exports = Controller