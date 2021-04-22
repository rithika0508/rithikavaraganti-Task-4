const Guvi = require('../Schemas/GuviSchema')
const express = require('express')
const Router = new express.Router()
// creating guvi
Router.post('/guvis', async (req, res) => {
    try {
        const guvi = await new Guvi(req.body)
        await guvi.save()
        res.status(201).send(guvi)
    } catch (error) {
        res.status(400).send({
            error: 'Name already in use!'
        })
    }
})
// Reading guvi
//getting a guvi by Id
Router.get('/guvis/:guviId', async (req, res) => {
    try {
        const guvi = await Guvi.find({ _id: req.params.guviId })
        if(guvi[0]) {
            res.send(guvi)
        }
        else {
            res.send({
            error: 'No such guvi exist'}
        )
        }
    } catch (error) {
        res.send({
            error: 'Invalid details'
        })
    }
})
//reading all guvis displaying only name and label
Router.get('/guvis', async (req, res) => {
    try {
        const guvi = await Guvi.find({})
        res.send(guvi)
    } catch (error) {
        res.status(400).send('error')
    }
})


//Updating guvi

Router.patch('/guvi', async (req, res) => {
    try {
        const removeid = await Guvi.removeId(req.body)  // returning obj
        const array = Object.keys(removeid)
        const allowedUpdates = ['name', 'label']
        const guvi = await Guvi.findOne(req.body._id)

        const canBeUpdated = array.filter((arr) => {
            return allowedUpdates.includes(arr)
        })

        canBeUpdated.forEach((detail) => {
            guvi[detail]=req.body[detail]
        })
        await guvi.save()
        res.status(201).send(guvi)
    } catch (error) {
        res.status(400).send(error)
    }
})

//deleting guvis
Router.delete('/guvis/:guviId', async (req, res) => {
    try {
        const guvi = await Guvi.findByIdAndDelete({ _id:req.params.guviId })
        
        if(guvi) {
            console.log(guvi)
            res.send({
                message: 'Guvi succesfully deleted'
            })
        }
        else {
            res.send({
            error: 'The guvi doesnt exist!'
        })
    }
    } catch (error) {
        res.send({
            error: 'Invalid details!'
        })
    }
    
})

module.exports = Router