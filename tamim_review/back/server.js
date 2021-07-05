const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// server config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

//🦋🦋🦋 MONGODB SCHEMAS
const gameSchema = new mongoose.Schema({
  name: String,
  gender: String,
  img: String,
  id: String,
  psiPowers: Array,
});

const gameModel = mongoose.model("game", gameSchema);

//🦋🦋🦋 APP ROUTERS

app.get("/getDataFromApi", (req, res) => {
  const Url = "https://psychonauts-api.herokuapp.com/api/characters?limit=10";
  axios
    .get(Url)
    .then((result) => {
      let backData = result.data.map((item) => new Game(item));
      res.status(200).send(backData);
    })
    .catch((err) => {
      console.log("BAD REQUIEST ", err);
    });
});

app.post("/addGameToFav", (req, res) => {
  const { name, gender, img, id, psiPowers } = req.body;
  console.log(req.body);

  const gameItem = new gameModel({
    name: name,
    gender: gender,
    img: img,
    id: id,
    psiPowers: psiPowers,
  });
  gameItem.save();
  res.status(200).send("item added to db");
});

app.get("/getFavGame", (req, res) => {
  gameModel.find({}, (err, favGame) => {
    if (err) {
      res.send("there is error");
    } else {
      res.status(200).send(favGame);
    }
  });
});

app.delete("/deleteFavItem/:id", (req, res) => {
  const { id } = req.params;
  gameModel.findOneAndDelete({ _id: id }, (err, favGame) => {
    if (err) {
      res.send("there is error");
    } else {
      gameModel.find({}, (err, favGame) => {
        if (err) {
          res.send("there is error");
        } else {
          res.status(200).send(favGame);
        }
      });
    }
  });
});

app.put("/updateFavItem", (req, res) => {
  const { id, name, gender } = req.body;
  gameModel.findOne({ _id: id }, (err, favGame) => {
    if (err) {
      res.send("there is error");
    } else {
      favGame.name = name;
      favGame.gender = gender;
      favGame.save().then(() => {
        gameModel.find({}, (err, favGame) => {
          if (err) {
            res.send("there is error");
          } else {
            res.status(200).send(favGame);
          }
        });
      });
    }
  });
});

// classes
class Game {
  constructor(data) {
    this.name = data.name;
    this.gender = data.gender;
    this.img = data.img;
    this.id = data._id;
    this.psiPowers = data.psiPowers;
  }
}

// general routers
app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO THE SERVER TESTING ROUTER ");
});

app.all("*", (req, res) => {
  res.status(200).send("THIS ROUTER IS NOT HANDELD YET TRY ANOTHER ROUTERS");
});

// CONNECTIONS
mongoose.connect("mongodb://localhost:27017/gametwo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`APP IS UP AND RUN ON PORT: http://localhost:${PORT}`);
});
