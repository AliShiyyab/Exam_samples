import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
export class UpdateModals extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Modals</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form  onSubmit={this.props.updateFormData}>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update Name</Form.Label>
              <Form.Control type="text" defaultValue={this.props.name} name="name"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update Level</Form.Label>
              <Form.Control type="text" defaultValue={this.props.level} name="level"/>
            </Form.Group>


            <Button variant="primary" type="submit">
              Updata
            </Button>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.props.closeModal}>
            Close
          </Button>
        </Modal.Footer>


      </Modal>
    );
  }
}

export default UpdateModals;
