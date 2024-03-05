// const bodyParser = require('bodyParser')
// const mongoose = require('mongoose')
// const express = require('express')
// const {Expense} = require ('./schema.js')
// const app = express()
// app.use(bodyParser.json())

// async function connecttodb(){
//     await mongoose.connect('mongodb+srv://nithishnith:nithishrayson@nithish.jj1kitv.mongodb.net/?retryWrites=true&w=majority&appName=nithish')
//     const port = 8000
//     app.listen(port,function(){
//         console.log(`Listening to port ... ${port}`)
//     })
// }

// app.post('/add-expense',function(request,respond){
//     try{
//         await Expense.create({
//             "amount" : request.body.amount,
//             "category" : request.body.category,
//             "date" : request.body.date
//         })
//         response.status(201.json)({
//             "status" : "success",
//             "message" : "entry created"
//         })
//     }
//     catch(error){
//         response.status(500).json({

//         })
//     }

// })


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const { Expense } = require('./schema.js');
const app = express();
app.use(bodyParser.json());

async function connecttodb() {
  try {
    await mongoose.connect('mongodb+srv://nithishnith:nithishrayson@nithish.jj1kitv.mongodb.net/?retryWrites=true&w=majority&appName=nithish', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const port = 8000;
    app.listen(port, function () {
      console.log(`Listening to port ... ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

app.post('/add-expense', async function (request, response) {
  try {
    const newExpense = await Expense.create({
      amount: request.body.amount,
      category: request.body.category,
      date: request.body.date,
    });

    response.status(201).json({
      status: 'success',
      message: 'entry created',
      data: newExpense, 
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});
connecttodb();
