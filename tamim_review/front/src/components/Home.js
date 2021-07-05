import React, { Component } from 'react'
import {Col, Container ,Row } from 'react-bootstrap'
import axios from 'axios'
import HomeCard from './HomeCard'
export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameData:[],
        }
    }


    componentDidMount=()=>{
        const Url = `${process.env.REACT_APP_SERVER}/getDataFromApi`
        axios.get(Url)
        .then(result =>{
            this.setState({
                gameData:result.data,
            })
        })
        .catch(err=>{
            console.log("BAD REQUIEST " ,err)
        })
    }


    // add to FavPageCard
    addToFav=(obj)=>{
        console.log(obj)
        const Url = `${process.env.REACT_APP_SERVER}/addGameToFav`
        axios.post(Url,obj)
        .then(result =>{
            console.log(result.data)
        })
        .catch(err=>{
            console.log("BAD REQUIEST " ,err)
        })

    }
    render() {
        return (
        
                <Container>
                <Row>

                {
                    this.state.gameData.map((item ,idx)=>{
                        return (
                            <Col key={idx}>
                            <HomeCard
                            item={item}
                            idx={idx}
                            addToFav={this.addToFav}
                            />
                            </Col>
                        )
                    })
                }


                    
                </Row>
                </Container>

        )
    }
}

export default Home
