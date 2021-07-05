import React, { Component } from "react";
import {Card, Button} from 'react-bootstrap'
import {Col ,Row,Container } from 'react-bootstrap'
export class HomeCard extends Component {
  render() {

    
    const psiPowers = this.props.item.psiPowers.map((item , idx) =>{
        return (

            <Col key={idx}>
            <Card style={{ width: "7rem" , margin:"0.3rem"}}>
              <Card.Img variant="top" src={item.img}/>
              <Card.Text>{item.name}</Card.Text>
            </Card>
          </Col>

        )

    })
    return (
      <Card style={{ width: "22rem" , margin:"1rem"}}>

        <Card.Img variant="top" src={this.props.item.img} style={{height: "15rem"}}/>

        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <Card.Text>{this.props.item.gender}</Card.Text>
        </Card.Body>


        <Card.Footer >
        <Container>
            <Row>
            {psiPowers}

            </Row>
        </Container>
        </Card.Footer>

        <Card.Footer>
        <Button 
           variant="info"
           style={{ marginLeft:"3rem" , width:"15rem" , height:"3rem" }}
           onClick={()=>this.props.addToFav(this.props.item)}
           >Add To Favorit</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default HomeCard;
