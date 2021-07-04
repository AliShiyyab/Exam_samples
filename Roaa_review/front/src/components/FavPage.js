import axios from "axios";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FavPageCard from "./FavPageCard";
import UpdateModals from "./UpdateModals";
export class FavPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favGame: [],
      show: false,
      name: "",
      level: "",
      id:-1,
    };
  }

  // to get all the data from the database and render them in FavPageCard
  componentDidMount = () => {
    const Url = `${process.env.REACT_APP_SERVER_URL}/getDataFromDB`;
    axios
      .get(Url)
      .then((result) => {
        this.setState({
          favGame: result.data,
        });
      })
      .catch((err) => {
        console.log("ERR THERE SOMETHING WRONG", err);
      });
  };

  // function to delete item
  deleteFun = (id) => {
    console.log(id);
    const Url = `${process.env.REACT_APP_SERVER_URL}/deleteDataFromDB/${id}`;
    axios
      .delete(Url)
      .then((result) => {
        this.setState({
          favGame: result.data,
        });
      })
      .catch((err) => {
        console.log("ERR THERE SOMETHING WRONG", err);
      });
  };

  // update fuctions

  showModal = (object) => {
    this.setState({
      show: true,
      name: object.name,
      level: object.level,
      id:object._id,
    });
  };
  closeModal = () => {
    this.setState({
      show: false,
    });
  };

  updateFormData=(event)=>{
      event.preventDefault();
      
      const updateObj = {
          id:this.state.id,
          name:event.target.name.value,
          level:event.target.level.value,
      }
   const Url = `${process.env.REACT_APP_SERVER_URL}/updateDataFromDB`;
      axios.put(Url , updateObj)
      .then((result) => {
        this.setState({
          favGame: result.data,
          show:false,
        });
      })
      .catch((err) => {
        console.log("ERR THERE SOMETHING WRONG", err);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.favGame.map((item, idx) => {
            return (
              <Col key={idx}>
                <FavPageCard
                  key={idx}
                  idx={idx}
                  item={item}
                  deleteFun={this.deleteFun}
                  showModal={this.showModal}
                />
              </Col>
            );
          })}
        </Row>

        {/* update modals */}
        <UpdateModals 
        showModal={this.state.show}
        closeModal={this.closeModal} 
        name={this.state.name}
        level={this.state.level}
        updateFormData={this.updateFormData}
        />
      </Container>
    );
  }
}

export default FavPage;
