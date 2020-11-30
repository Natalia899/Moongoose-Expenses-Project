const express = require('express')
const { db } = require('../models/Expenses')
const router = express.Router()
const Expenses = require('../models/Expenses')
const moment = require('moment')


router.get('/expenses', function (req, res) {
    let d1 = req.query
    let d2 = req.query
    console.log(d1)
    d1 = moment(d1.d1).format('L')
    d2 = moment(d1.d2).format('L')
    let currentDate = moment().format('L')
    console.log(d1);
    if (d1 && d2) {
        Expenses.find({
            
            $and: [{ data: { "$gte": d1 } }, { date: { "$lte": d2 } }]
        }, function (err, result) {
            res.send(result)
        })
    } else if (d1) {
        Expenses.find({
            $and: [{ date: { "$gte": d1 } }, { date: { "$lte": currentDate } }]
        })
    }
})
// Expenses.find({}, function(err, result){
//     res.send(result)
// })


// router.get('/expenses', function (req, res) {
//     Expenses.find({}).sort({
//         data: -1
//     }).exec(function (err, result) {
//         res.send(result)
//     })
// })

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





module.exports = router