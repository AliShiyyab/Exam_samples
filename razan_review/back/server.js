'use strict';

//dependencies
const express  = require('express');
const axios =require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

//🐱‍🚀🐱‍👓🐱‍💻 GET HELPERS FROM CONTROLLES & GET THE SCHEMAS 🐱‍🚀🐱‍👓🐱‍💻

const routersObj = require ('./controllers/helpers.js');
const model = require ('./models/schema.js')


// use dependencies 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());


// routers 
app.get('/' , (req ,res)=>{
   res.status(200).send("THE TESTING ROUTER IS WORKIING")
})

// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 EXAM ROUTERS START🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓

// get data from api 
app.get('/getData' , routersObj.getData);
app.post('/addToFav' , routersObj.addToFav)
app.get('/getFavItems' , routersObj.getFavItems)
app.delete('/deleteFood/:id' , routersObj.deleteFood) 
app.put('/UpdateFavItems/:id' ,routersObj.UpdateFavItems)

// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 EXAM ROUTERS END🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓

app.all('*' , (req ,res)=>{
   res.status(400).send("THIS ROUTER NOT WORKING YET ... PLZ TRY ANOTHER ROUTER")
})


//connections
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT , ()=>{
    console.log(`SERVER IS UP AND RUN ON PORT : http://localhost:${PORT}`)
})


