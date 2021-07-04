import React, { Component } from "react";
import { Card,Row,Button} from "react-bootstrap";

export class FoodCards extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const foodData = this.props.foodData;
    const ingredientLines = this.props.foodData.ingredientLines.map((element , idx) =>{
        return (
            <div key={idx}>
            <ul>
                <li >
                <Card.Text>{element}</Card.Text>
                </li>
                </ul>
            </div>
        )
    })

    return (
      <Row>
        <Card style={{
                  width: "15rem" ,
                  backgroundColor:"white",
                  margin:"2rem 1rem" , 
                  height: "fitContent"
              }}>
                <Card.Img 
                variant="top" 
                alt={"foods img"}
                src={foodData.image} 
                />

                <Card.Body>
                  <Card.Title>{foodData.label}</Card.Title>
                  <br/> 
                  {ingredientLines}
                </Card.Body>

                <Card.Footer>

                <Button 
                variant="warning"
                onClick={()=>this.props.addToFav(foodData)}
                >Add To FavoriteRecipes
                </Button>

                </Card.Footer>

              </Card>
      </Row>
    );
  }
}

export default FoodCards;
