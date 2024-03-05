// const mongoose = require('mongoose')
// const expensetrackerschema = new mongoose.Schema({
//     amount : {
//         type : Number
//     },
//     category : {
//         type : String
//     },
//     date : {
//         type : String
//     }
// })
// const Expense = mongoose.model('expensedetails',expensetrackerschema)
// module.exports = {Expense}

const mongoose = require('mongoose')

const expenseTrackerSchema = new mongoose.Schema({
    amount : {
        type : Number
    },
    category : {
        type : String
    },
    date : {
        type : String
    }
})

const Expense = mongoose.model('expensedetails', expenseTrackerSchema)

module.exports = { Expense }