const express = require('express')
const { db } = require('../models/Expenses')
const router = express.Router()
const Expenses = require('../models/Expenses')
const moment = require('moment')

router.get("/expenses", (req, res) => {    
    const { d1, d2 } = req.query;
    if (d1 && d2) {        
        Expenses.find({            
            date: { "$gte": moment(d1).toDate(),
                    "$lte": moment(d2).toDate()
         }}).then(expense => res.send(expense))
        } else if (d1 && !d2) {        
            Expenses.find({ date: { "$gte": moment(d1).toDate()
        }}).then(expense => res.send(expense));    
    } else {        
        Expenses.find({}).sort("-date").then(expense => res.send(expense))
    }
}
)

router.get('/all_expenses', function (req, res) {
    Expenses.find({}).exec(function (err, result) {
        res.send(result)
    })
})

router.post('/expense', function (req, res) {
    let expense = req.body
    let date = expense.date ? moment(new Date(expense.date)).format('LLLL') : moment().format('LLLL')
    let newExpense = new Expenses({ item: expense.name, amount: expense.amount, group: expense.group, date })
    newExpense.save().then(result => {
         console.log(`You spent ${result.amount} for ${result.item}`);
         const db = Expenses.find({}).then(dbExpenses =>{ 
            console.log('------------------');
            console.log(dbExpenses);
            console.log('------------------');
            res.send(dbExpenses)
            })        
    })
})

router.put('/update/:group1/:group2', function (req, res) {
    let group1 = req.params.group1
    let group2 = req.params.group2
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