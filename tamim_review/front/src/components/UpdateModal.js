import React, { Component } from "react";
import { Modal, Button ,Form } from "react-bootstrap";
export class UpdateModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        {/* onSubmit={this.props.updateFunction} */}
          <Form onSubmit={this.props.updateFunction} >

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update Name</Form.Label>
              <Form.Control type="text" defaultValue={this.props.name} name="name"/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update gender</Form.Label>
              <Form.Control type="text" defaultValue={this.props.gender} name="gender"/>
            </Form.Group>

            <Button variant="info" type="submit">
              Update
            </Button>


          </Form>


        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.props.close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdateModal;
