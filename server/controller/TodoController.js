const {Todo} = require('../models')

class Controller {
    static show(req,res,next){

        Todo.findAll()
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return next(err)
        })
    }
    static add(req,res,next){
        console.log(req.user,'nah')
        let params = {
            title:req.body.title,
            description:req.body.description,
            due_date:req.body.due_date,
            UserId:req.user.id
        }
        console.log(params)
        Todo.create(params)
        .then(data=>{
            console.log('masuk')
            return res.status(201).json(data)
        })
        .catch(err=>{
            console.log(err)
            return next(err)
        })
    }
    static find(req,res,next){
        let options = {where:{id:req.params.id}}
        Todo.findOne(options)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            // return res.status(404).json({message:`cant find`})
            return next(err)
        })
    }
    static edit(req,res,next){
        let params = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        let options = {where:{id:req.params.id}}
        Todo.update(params,options)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            // return res.status(304).json({message:`not updated`})
            return next(err)
        })
    }
    static delete(req,res){
        let options = {where:{id:req.params.id}}
        Todo.destroy(options)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            // return res.status(404).json({message:`not deleted data not found`})
            return next(err)
        })
    }

}

module.exports = Controller