import React, { Component } from 'react'
import axios from 'axios'
import {Container , Row ,Col} from 'react-bootstrap'
import GameCard from './GameCard'

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameData:[],
            selectedGame:[]
        }
    }

    componentDidMount=()=>{

        const Url =`${process.env.REACT_APP_SERVER_URL}/getDataFromApi`;
        axios.get(Url)
        .then(result=>{
            console.log(result.data)
            this.setState({
                gameData:result.data,
            })
        })
        .catch(err=>{
            console.log("ERR THERE SOMETHING WRONG" , err)
        })
    }

    //add to favourate 
    addToFav=(object)=>{
        console.log(object)
        const Url =`${process.env.REACT_APP_SERVER_URL}/addToFav`;
        axios.post(Url ,object)
        .then(result=>{
            console.log(result.data)
        })
        .catch(err=>{
            console.log("ERR THERE SOMETHING WRONG" , err)
        })
    }




    render() {
        return (
                <Container>
                <Row>

                    {
                        this.state.gameData.map((item,idx)=>{
                            return(
                                <Col>
                                    <GameCard
                                    key={idx}
                                    idx={idx}
                                    item={item}
                                    addToFav={this.addToFav}
                                    />
                                </Col>
                            );
                        })
                    }
                </Row>
                </Container>
        )
    }
}

export default Home
