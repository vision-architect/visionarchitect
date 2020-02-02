import React, { Component } from "react";
import Modal from "./label_model";
import axios from "axios";
import ls from 'local-storage';
import qs from 'qs';
import {Link} from "react-router-dom";

export default class Dataset extends Component {
    constructor(props){
        super(props);
        if (! ls.get('db')){
            const temp = this.props.location.query.dataset;
            ls.set('db',temp)
        }
        this.state = {
            activeItem: {
            label_name: "",
            label_description: "",
            dataset: '',
            },
            labels: [],
            images: [],
            db: ls.get('db'),
        }
        this.refreshList()
    }
    
    componentDidMount() {
      this.setState({db:ls.get('db')})
      this.refreshList();
    }

    refreshList = () => {
      axios
        .get("http://localhost:8000/backend/labels/")
        .then(res => this.setState({ labels: res
          .data
          .filter( item => item.dataset === this.state.db ) }))
        .then( () =>  this.setState({db: ls.get('db')}))
      axios
        .get("http://localhost:8000/backend/images/")
        .then(res => {
          const u = this.state.labels.map( (i)=> i.id)
          this.setState({ images: res
          .data
          .filter(item => u.includes(item.label))
          .sort()
          })
        })
        .catch(err => console.log(err));
    };

    renderImages = () =>{
        const newImages = this.state.images;
        return newImages.map(item => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={'todo-title mr-2'}
                title={item.img_url}
              >
                <img src={item.img_url} alt={item.img_url} height='150' width='250'></img>
                 <br></br>
                <p className="item-description"> LABEL: {this.state.labels.filter(label => label.id === item.label)[0].label_name} </p>
              </span>
            </li>
          ));
        };
        
    renderItems = () => {
      const newItems = this.state.labels.filter(item => item.label_name !=='unlabelled' && item.label_name !== 'Trash');
      return newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={'todo-title mr-2 item-name'}
            title={item.label_name}
          >
              {item.label_name}
             <br></br>
             <p className="item-description">{item.label_description}</p>
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
            >
              {" "}
              Edit{" "}
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete{" "}
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
      if (item.label_name) {
        axios
          .post('http://localhost:8000/backend1/create-label/', 
          qs.stringify({label_name:item.label_name,
            label_description:item.label_description,
            dataset:this.state.db}))
          .then(res => this.refreshList());
        return;
      }
      this.refreshList();
    };
    handleDelete = item => {
      axios
        .delete(`http://localhost:8000/backend/labels/${item.id}`)
        .then(res => this.refreshList());
    };
    createItem = () => {
        const item = { label_name: "", label_description: "", dataset:''};
        this.setState({ activeItem: item, modal: !this.state.modal });  
    };
    editItem = item => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
    render() {
      return (
        ls.set('db',this.state.db),
        <main className="content ">
          <h1 className="text-white text-uppercase text-center my-4">Dataset {this.state.db} </h1>
          <h3 className="text-white text-uppercase text-center my-4"> Labels </h3>
          <div className="row " >
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3 ">
                <div className="">
                  <button onClick={this.createItem} className="btn btn-primary">
                    Add Label
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
          <h3 className="text-white text-uppercase text-center my-4"> Images </h3>
          <div className="row " >
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3 ">
                <button  className="btn button">
                  <Link className="text-white" to={`/images/${this.state.db}`} >
                    Upload Images
                  </Link>
                </button>
                <br></br>
                <button  className="btn button">
                  <Link className="text-white" to={`/label-images/${this.state.db}`} >
                    Label Images
                  </Link>
                </button>
                <ul className="list-group list-group-flush ">
                  {this.renderImages()}
                </ul>
              </div>
            </div>
          </div>
        </main>
      );
    }
  }