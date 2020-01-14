import React, { Component } from "react";
import {Link} from "react-router-dom";
import Modal from "./dataset_modal";
import axios from "axios";
import ls from 'local-storage'
import qs from 'qs';

export default class Datasets extends Component {
    constructor(props) {
      super(props);
      ls.clear()
      this.state = {
        activeItem: {
          dataset_name: "",
          dataset_description: "",
        },
        todoList: [],
      };
    }
    componentDidMount() {
      this.refreshList();
    }
    refreshList = () => {
      axios
        .get("http://localhost:8000/backend/datasets/")
        .then(res => this.setState({ todoList: res.data }))
        .catch(err => console.log(err));
    };
    renderItems = () => {
      const newItems = this.state.todoList;
      return newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={'todo-title mr-2'}
            title={item.dataset_description}
          >
             <Link className="item-name" to={{ pathname: `/dataset/${item.id}`, query:{dataset:item.id}}}>
               {item.dataset_name}
             </Link>
             <br></br>
             <p className="item-description">{item.dataset_description}</p>
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </span>
        </li>
      ));
    };
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
    handleSubmit = item => {
      this.toggle();
      if (item) {
        axios
        .post('http://localhost:8000/backend1/create-dataset/', 
        qs.stringify({dataset_name:item.dataset_name,
          dataset_description:item.dataset_description,}))
          .then(res => this.refreshList());
        return;
      }
      axios
        .post("http://localhost:8000/backend/datasets/", item)
        .then(res => this.refreshList());
    };
    handleDelete = item => {
      axios
        .delete(`http://localhost:8000/backend/datasets/${item.id}`)
        .then(res => this.refreshList());
    };
    createItem = () => {
      const item = { dataset_name: "", dataset_description: "" };
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
    editItem = item => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
    render() {
      return (
        <main className="content ">
          <h1 className="text-white text-uppercase text-center my-4">Datasets</h1>
          <div className="row " >
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3 ">
                <div className="">
                  <button onClick={this.createItem} className="btn btn-primary">
                    Add Dataset
                  </button>
                </div>
                <ul className="list-group list-group-flush ">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      );
    }
  }