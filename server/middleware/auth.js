const {verify} = require('../helper/jwt')
const {User, Todo} = require('../models')
const user = require('../models/user')

const authentication = (req,res,next) =>{
    const {access_token} = req.headers

    try {
        const user = verify(access_token)
        req.user = user
        User.findOne({where:{email:user.email}})
        .then(data=>{
            next()
        })
        .catch(err=>{
            throw err
        })
    }catch(err){
        next(err)
    }
}

const authorization = (req,res,next)=>{
    const id = req.params.id
    Todo.findOne({where:{id}})
    .then(data=>{
        if (data){
            if(data.UserId === req.user.id){
                next()
            }else{
                throw ({message:`forbiden access`,status:403})
            }
        }else{
            throw ({message:`forbiden access`,status:403})    
        }
    })
    .catch(err=>{
        return next(err)
    })
    
}


module.exports = {authentication , authorization}