import React, { Component } from "react";
import axios from "axios";
import { CardGroup, Container } from "react-bootstrap";
import FoodCards from "../components/FoodCards";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodData: [],
      favFood:[],
    };
  }

  componentDidMount = async() => {
    const Url = `${process.env.REACT_APP_SERVER}/getData`;
    axios
      .get(Url)
      .then((result) => {
        this.setState({
           foodData: result.data,
        });
      })
      .catch((err) => {
        console.log("BAD REQUIEST", err);
      });
  };

  addToFav = (returnedData) => {
    const Url = `${process.env.REACT_APP_SERVER}/addToFav`;
    console.log(returnedData.label)
    axios
      .post(Url, returnedData)
      .then((result) => {
        this.setState({
          favFood:result.data,
        })
        console.log("FOOD HAS BEEN STORED INTO MY FAVORITE" , this.state.favFood);
      })
      .catch((err) => {
        console.log("Bad REQUIEST FROM => ADD TO FAVORITE ", err);
      });
  };

  render() {
    return (
      <Container>
        <h2 style={{ textAlign: "center" }}> Get all the data from the API </h2>

        <CardGroup>

          {this.state.foodData.map((food, idx) => {
            return (
              <FoodCards
                key={idx}
                index={idx}
                foodData={food}
                addToFav={this.addToFav}
              />
            );
          })}
        </CardGroup>
      </Container>
    );
  }
}

export default Home;
