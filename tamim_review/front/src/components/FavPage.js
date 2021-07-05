import React, { Component } from 'react'
import {Col, Container ,Row } from 'react-bootstrap'
import axios from 'axios'
import FavCard from './FavCard'
import UpdateModal from './UpdateModal'


export class FavPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            favGameData:[],
            show:false,
            name:'',
            gender:'',
            id:-1,
        }
    }


    componentDidMount=()=>{
        const Url = `${process.env.REACT_APP_SERVER}/getFavGame`
        axios.get(Url)
        .then(result =>{
            this.setState({
                favGameData:result.data,
            })
        })
        .catch(err=>{
            console.log("BAD REQUIEST " ,err)
        })
    }


    // delete
    deleteFavItem=(id)=>{
        const Url = `${process.env.REACT_APP_SERVER}/deleteFavItem/${id}`
        axios.delete(Url)
        .then(result =>{
            this.setState({
                favGameData:result.data,
            })
        })
        .catch(err=>{
            console.log("BAD REQUIEST " ,err)
        })
    }

    //===========> update

    showFun = (gameObj)=>{
        this.setState({
            show:true,
            name:gameObj.name,
            gender:gameObj.gender,
            id:gameObj._id
        })
    }

    closeFun = ()=>{
        this.setState({
            show:false,
        })
    }


    updateFunction= async (event)=>{
        event.preventDefault()

        await this.setState({
            name:event.target.name.value,
            gender:event.target.gender.value,
        })
        
            const obj= {
                name:this.state.name,
                gender:this.state.gender,
                id:this.state.id
            }

            const Url = `${process.env.REACT_APP_SERVER}/updateFavItem`
            axios.put(Url , obj)
            .then(result =>{
                this.setState({
                    favGameData:result.data,
                    show:false,
                })
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
                this.state.favGameData.map((item ,idx)=>{
                    return (
                        <Col key={idx}>
                        <FavCard
                        item={item}
                        idx={idx}
                        deleteFavItem={this.deleteFavItem}
                        showFun={this.showFun}
                        />
                        </Col>
                    )
                })
            }
            </Row>

            {/* update game cards */}
            <UpdateModal
            show={this.state.show}
            close={this.closeFun}
            name={this.state.name}
            gender={this.state.gender}
            updateFunction={this.updateFunction}
            />



            </Container>
        )
    }
}

export default FavPage
