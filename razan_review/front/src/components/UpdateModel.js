import React, { Component } from "react";
import { Modal, Button,Form } from "react-bootstrap";
export class UpdateModel extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.ShowUpdateFoodForm}
          onHide={this.props.closeUpdateFoodForm}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Modal</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Update Label</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Change Value"
                value={this.props.lableData}
                onChange={this.props.updateLableData}
                />

              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Updat Image</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Change Value:"
                value={this.props.imageData}
                onChange={this.props.updateImageData}
                />

              </Form.Group>

              
            <Button 
                variant="info"
                onClick={this.props.sendUpdateReq}
                >
                Update Data
            </Button>
            </Form>


          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.closeUpdateFoodForm}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateModel;
