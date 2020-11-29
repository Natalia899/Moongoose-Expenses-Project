const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expensesSchema = new Schema({
    name: String,
    amount: Number,
    date: Date,
    group: String
})

const Expenses = mongoose.model("Expenses", personSchema)
module.exports = Expenses