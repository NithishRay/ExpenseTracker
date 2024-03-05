const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./Schema.js')

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://nithishnith:nithishray123@nithish.jj1kitv.mongodb.net/Expense-Tracker?retryWrites=true&w=majority&appName=nithish')
        console.log('DB connection established :)')
        const port = process.env.PORT || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()

app.get('/get-expenses', async function(request, response) {
    try {
        const expensesData = await Expense.find()
        response.status(200).json(expensesData)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : error
        })
    }
})

app.post('/add-expense', async function(request, response) {
    try {
        await Expense.create({
            "amount" : request.body.amount,
            "category" : request.body.category,
            "date" : request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry created"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})

app.delete('/delete-expense/:id', async function(request,response){
    try{
        const ExpenseData = await Expense.findById(request.params.id)
        if(ExpenseData) {
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "deleted entry"
            })
        }
        else {
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    }
    catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})

app.patch('/edit-expense/:id', async function(request, response) {
    try {
        const expenseEntry = await Expense.findById(request.params.id)
        if(expenseEntry) {
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "updated entry"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})