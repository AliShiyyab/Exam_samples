'use strict';

//dependencies
const express  = require('express');
const axios =require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// use dependencies 

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());


// routers 
app.get('/' , (req ,res)=>{
   res.status(200).send("THE TESTING ROUTER IS WORKIING")
})
// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 Database code start🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓
const gameSchema = new mongoose.Schema({
    name: String,
    img:String,
    level:String,
  });

  const gameModel = mongoose.model('game', gameSchema);

// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 Database code end🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓


// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 EXAM ROUTERS START🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓

app.get('/getDataFromApi', (req ,res)=>{
    const URL="https://digimon-api.vercel.app/api/digimon"
    axios.get(URL)
    .then(result =>{
        res.status(200).send(result.data)
    })
    .catch(err=>{
        console.log("ERR THERE SOMETHING WRONG" , err)
    })
})
//==========> post
app.post('/addToFav', (req ,res)=>{

   const {name , img , level} = req.body
   const newObj = new gameModel(
    {
        name:name,
        img:img,
        level:level,
    }
   )
   newObj.save();
})
//==========> get
app.get('/getDataFromDB' , (req,res) => {
    gameModel.find({} , (err ,gameData)=>{
        if(err){
            console.log("we cant get data form api " ,err);
        }else{
            console.log(gameData)
            res.status(200).send(gameData)
        }
    })
})
//==============> delete
app.delete('/deleteDataFromDB/:id' , (req,res) => {
    const {id} = req.params

    gameModel.findOneAndRemove({_id:id} , (err ,gameData)=>{
        if(err){
            console.log("we cant get data form api " ,err);
        }else{
            gameModel.find({} , (err ,gameData)=>{
                if(err){
                    console.log("we cant get data form api " ,err);
                }else{
                    res.status(200).send(gameData)
                }
            })
            
        }
    })
})
//============> update 
app.put('/updateDataFromDB' , (req,res) => {
    const {id ,name ,level} = req.body

    gameModel.findOne({_id:id} , (err ,gameData)=>{
        if(err){
            console.log("we cant get data form api " ,err);
        }else{
            gameData.name=name;
            gameData.level=level;
            gameData.save()
            .then(()=>{
                gameModel.find({} , (err ,gameData)=>{
                    if(err){
                        console.log("we cant get data form api " ,err);
                    }else{
                        res.status(200).send(gameData)
                    }
                })
            })
        }
    })
})

// 🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀 EXAM ROUTERS END🐱‍👓🐱‍💻🐱‍🚀🐱‍👓🐱‍💻🐱‍🚀🐱‍👓

app.all('*' , (req ,res)=>{
   res.status(400).send("THIS ROUTER NOT WORKING YET ... PLZ TRY ANOTHER ROUTER")
})


//connections
mongoose.connect('mongodb://localhost:27017/game', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT , ()=>{
    console.log(`SERVER IS UP AND RUN ON PORT : http://localhost:${PORT}`)
})


