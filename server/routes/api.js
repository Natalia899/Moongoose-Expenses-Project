const express = require('express')
const { db } = require('../models/Expenses')
const router = express.Router()
const Expenses = require('../models/Expenses')



module.exports = router