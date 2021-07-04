import React, { Component } from "react";
import { Container ,CardGroup} from "react-bootstrap";
import axios from 'axios';
import FavFoodCards from './FavFoodCards'
import UpdateModel from './UpdateModel'



export class FavoriteRecipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favFoodData:[],
            showUpdateForm:false,
            index:null,
            selectedFoodItem:{},
            lableData:'',
            imageData:'',

        }
    }

//==========================getData==============================//
    componentDidMount=()=>{
        const Url =`${process.env.REACT_APP_SERVER}/getFavItems`;
        axios.get(Url)
        .then(result =>{
            this.setState({
                favFoodData:result.data,
            })
        } )
        .catch(err=>{
            console.log("We have problem gitting Data from the database" ,err)
        })
    }

//==========================delete==============================//
    // 🐱‍🚀🐱‍👓🐱‍💻 delete items function 
    deleteFood=(index) =>{
        const id = this.state.favFoodData[index]._id;
        let Url= `${process.env.REACT_APP_SERVER}/deleteFood/${id}`;

        axios.delete(Url)
        .then(result =>{
          this.setState({
                favFoodData:result.data,
            })
        } )
        .catch(err=>{
            console.log("We have problem Deleting Data from the database" ,err)
        })
    }


//==========================update==============================//


   // 🐱‍🚀🐱‍👓🐱‍💻 update function 
    ShowUpdateFoodForm=(selectedFoodItem)=>{
      this.setState({
        showUpdateForm:true,
        selectedFoodItem:selectedFoodItem,
        lableData:selectedFoodItem.label,
        imageData:selectedFoodItem.image,
      })
    }

  // close form 
  closeUpdateForm =() =>{
    this.setState({
      showUpdateForm:false,
    })
  }

  // get the changed data
  updateLableData=(event)=>{
    this.setState({
      lableData:event.target.value,
    })
  }
  
  updateImageData=(e)=>{
    this.setState({
      imageData:e.target.value,
    })
  }
  // ONCLICK FORM SEND REQUIEST TO THE BACK-END 
  sendUpdateReq=(event)=>{
    event.preventDefault();
    const id = this.state.selectedFoodItem._id;
    const Url = `${process.env.REACT_APP_SERVER}/UpdateFavItems/${id}`;

    let updateData={
      label:this.state.lableData,
      image:this.state.imageData,
    }
    axios.put(Url ,updateData)
    .then(result =>{
      this.setState({
        favFoodData:result.data,
        showUpdateForm:false,
      })
    })
    .catch(err=>{
      console.log("We have problem Updating Data from the database" ,err)
  })

  }
//======================render==========================//
  render() {
    // console.log(this.state.selectedFoodItem)
    return (
        <Container>
        <h2 style={{ textAlign: "center" }}> Get all the data from MongoDB</h2>

        <CardGroup>

          {this.state.favFoodData.map((food, idx) => {
            return (
              <FavFoodCards
                key={idx}
                index={idx}
                foodData={food}
                deleteFood={this.deleteFood}
                ShowUpdateFoodForm={this.ShowUpdateFoodForm}
              />
            );
          })}
        </CardGroup>

         
        
        <UpdateModel
        ShowUpdateFoodForm={this.state.showUpdateForm}
        closeUpdateFoodForm={this.closeUpdateForm}
        lableData={this.state.lableData}
        imageData={this.state.imageData}
        sendUpdateReq={this.sendUpdateReq}
        updateLableData={this.updateLableData}
        updateImageData={this.updateImageData}
        />

        </Container>
    );
  }
}

export default FavoriteRecipes;
