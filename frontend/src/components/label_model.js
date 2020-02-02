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

export default class LabelModal extends Component {
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
        <ModalHeader toggle={toggle}> Label Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="label_name">Label Name</Label>
              <Input
                type="text"
                name="label_name"
                value={this.state.activeItem.label_name}
                onChange={this.handleChange}
                placeholder="Enter Label Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="label_description">Label Description</Label>
              <Input
                type="text"
                name="label_description"
                value={this.state.activeItem.label_description}
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
