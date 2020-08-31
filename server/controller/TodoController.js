const {Todo} = require('../models')

class Controller {
    static show(req,res){
        Todo.findAll()
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(400).json(err)
        })
    }
    static add(req,res){
        let params = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }
        Todo.create(params)
        .then(data=>{
            return res.status(201).json(data)
        })
        .catch(err=>{
            return res.status(400).json({mesage:`error`})
        })
    }
    static find(req,res){
        let options = {where:{id:req.params.id}}
        Todo.findOne(options)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(404).json({message:`cant find`})
        })
    }
    static edit(req,res){
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
            return res.status(304).json({message:`not updated`})
        })
    }
    static delete(req,res){
        let options = {where:{id:req.params.id}}
        Todo.destroy(options)
        .then(data=>{
            return res.status(200).json(data)
        })
        .catch(err=>{
            return res.status(404).json({message:`not deleted data not found`})
        })
    }

}

module.exports = Controller