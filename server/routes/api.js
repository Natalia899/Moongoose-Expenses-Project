const express = require('express')
const { db } = require('../models/Expenses')
const router = express.Router()
const Expenses = require('../models/Expenses')
const moment = require('moment')

// router.get('/expenses', function(req, res){
//     Expenses.find({}, function(err, result){
//         res.send(result)
//     })
// })

router.get('/expenses', function (req, res) {
    Expenses.find({}).sort({
        data: -1
    }).exec(function (err, result) {
        res.send(result)
    })
})

router.post('/expense', function (req, res) {
    let expense = req.body
    let date = expense.date ? moment(new Date(expense.date)).format('LLLL') : moment().format('LLLL')
    let newExpense = new Expenses({ item: expense.name, amount: expense.amount, group: expense.group, date })
    newExpense.save().then(result => { console.log(`You spent ${result.amount} for ${result.item}`); })
    res.send(newExpense)
})

router.put('/update', function (req, res) {
    let group1 = "rent"
    let group2 = "food"
    Expenses.findOneAndUpdate({ group: group1 }, { group: group2 }, { new: true }, function (err, updatedGroup) {
        res.send(`the ${updatedGroup.item}s group was changed to ${updatedGroup.group}`)
    })
})

router.get('/expenses/:group/:total', function (req, res) {
    let groupName = req.params.group
    let total = req.params.total

    total ? Expenses.aggregate([
        { $match: { group: groupName } },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]).exec(function (err, result) {
        res.send(result)
    }) : Expenses.find({ group: groupName }, function (error, response) {
        res.send(response) 
    })
})

    // if (total){
    //     Expenses.aggregate([
    //         { $group: 
    //            { _id: {$match: groupName}, 
    //            totalSpent: { $sum: "$amount" } } }
    //       ]).exec(function(err, result){
    //           console.log(result);
    //           res.send(result) }) 
    // }

    //        })




    module.exports = router