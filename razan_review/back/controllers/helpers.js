const axios = require("axios");

// 🐱‍🚀🐱‍👓🐱‍💻 requier foodModel form schema
const foodModel = require("../models/schema.js");

const routersObj = {}; // incloudes all the routers functions

// 🐱‍🚀🐱‍👓🐱‍💻 get data from api
routersObj.getData = function (req, res) {
  const ingredient = "chicken";
  // ApiUrl = `https://api.edamam.com/search?q=checken&app_id=5098776f&app_key=ce719f67c7c1802f02ee1d09278acb6e`
  ApiUrl = `https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

  axios
    .get(ApiUrl)
    .then((result) => {
      const responce = result.data.hits.map((hits) => {
        return new foods(hits);
      });
      res.status(200).send(responce);
    })
    .catch((err) => {
      console.log("BAD REQUIEST", err);
    });
};

// foods class data modling
class foods {
  constructor(data) {
    this.label = data.recipe.label;
    this.image = data.recipe.image;
    this.ingredientLines = data.recipe.ingredientLines;
  }
}

// 🐱‍🚀🐱‍👓🐱‍💻 add to favorite function handler

routersObj.addToFav = function (req, res) {
  const { label, image, ingredientLines } = req.body;
  const foodObject = new foodModel({
    label:label,
    image:image,
    ingredientLines:ingredientLines,
  });

 foodObject.save().then(()=>{
 foodModel.find({} , (err ,foodData)=>{
     if(err){
         res.status(400).send("we can find data stored there is error" , err)
     }else {
         res.status(200).send(foodData);
     }
 })
});
};


// 🐱‍🚀🐱‍👓🐱‍💻 get all stored data to render them in favorite
routersObj.getFavItems=function (req, res) {

    foodModel.find({} , (err ,foodData)=>{
        if(err){
            res.status(400).send("we can find data stored there is error" , err)
        }else {
            res.status(200).send(foodData);
        }
    })

}

// 🐱‍🚀🐱‍👓🐱‍💻 delete items from the DataBase
routersObj.deleteFood = function (req, res) {

    const id = req.params.id;

    foodModel.findOneAndRemove({_id:id} , (err ,removedItem)=>{
        if(err){
            res.status(400).send("we can find data stored there is error" , err)
        }else {
            foodModel.find({} , (err ,foodData)=>{
                if(err){
                    res.status(400).send("we can find data stored there is error" , err)
                }else {
                    res.status(200).send(foodData);
                }
            })
        }
    })
}

// 🐱‍🚀🐱‍👓🐱‍💻 update items from the DataBase
routersObj.UpdateFavItems =function (req, res) {
  const {image , label} = req.body;
  const id = req.params.id;
  console.log(req.body , id);
  foodModel.findOne({_id:id} , (err , result)=>{
    if(err){
      res.status(400).send("we can find object stored there is error" , err)
    }else {
      result.label=label ; 
      result.image=image ; 
      result.save().then(()=>{

        foodModel.find({}, (err ,foodData)=>{
          if(err){
              res.status(400).send("we can find data stored there is error" , err)
          }else {
              res.status(200).send(foodData);
          }
      })

      })
    }
  })
}


module.exports = routersObj;
