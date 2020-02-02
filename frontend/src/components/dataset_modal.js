import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} >
        <ModalHeader toggle={toggle}> Dataset Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="dataset_name">Dataset Name</Label>
              <Input
                type="text"
                name="dataset_name"
                value={this.state.activeItem.dataset_name}
                onChange={this.handleChange}
                placeholder="Enter Dataset Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="dataset_description">Dataset Description</Label>
              <Input
                type="text"
                name="dataset_description"
                value={this.state.activeItem.dataset_description}
                onChange={this.handleChange}
                placeholder="Enter Dataset Description"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
