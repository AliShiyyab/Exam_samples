import React, { Component } from "react";
import {Card, Button} from 'react-bootstrap'
import {Col ,Row,Container } from 'react-bootstrap'
export class FavCard extends Component {
  render() {
    // console.log(this.props.item)
    
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
           variant="danger"
           style={{ marginLeft:"2rem" , width:"7rem" , height:"3rem" }}
           onClick={()=>this.props.deleteFavItem(this.props.item._id)}
           >Delete
        </Button>


        <Button 
           variant="info"
           style={{ marginLeft:"2rem" , width:"7rem" , height:"3rem" }}
           onClick={()=>this.props.showFun(this.props.item)}
           >Update
        </Button>


        </Card.Footer>
      </Card>
    );
  }
}

export default FavCard;

