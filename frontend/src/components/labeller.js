import React, {Component} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import qs from 'qs';

export default class Labeller extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: "",
            labels: [],
            db: this.props.match.params.pk,
        }
        this.refreshList()
    }
    refreshList = () => {
        axios
          .get("http://localhost:8000/backend/labels/")
          .then(res => this.setState({ labels: res
            .data
            .filter( item => item.dataset == this.props.match.params.pk ) 
        }))
        axios
          .get(`http://localhost:8000/backend1/get-image-to-label/${this.state.db}`)
          .then(res => {
              this.setState({ image: res.data})
            }
          )
          .catch(err => {
              this.setState({image:{
              img_url:'https://trythatsoap.com/static/soapsense/no_image_available.png',
              img_id: 'no unlabelled images avaliable'
            }})
            console.log(err)});
      };
  
    label_img = (label) => {
        const data = {
            image: this.state.image.img_id,
            label: label,
            dataset: this.state.db,
        };
        axios
        .post("http://localhost:8000/backend1/label-image/", qs.stringify(data))
        .then(res => this.refreshList() )
    }; 

    renderItems = () => {
        const newItems = this.state.labels.filter(item => item.label_name!=='unlabelled');
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
                <button type="submit" className="label-button btn item-name" onClick={()=> {this.label_img(item.id)}}>
                    {item.label_name}
                    </button>
            </span>
          </li>
        ));
      };
  
    render() {
        return (
            <main className="content ">
              <h1 className="text-white text-uppercase text-center my-4">Dataset {this.state.db} </h1>
              <h3 className="text-white text-uppercase text-center my-4"> Label Image </h3>
              <div className="row " >
                <div className=" mx-auto p-0">    
                  <div className="card p-3 ">
                    <div className="">
                      <button className="btn button">
                          <Link className="text-white" to={`/dataset/${this.state.db}`}>
                             Back to dataset
                          </Link>  
                      </button>
                    </div>
                    <div className="left-div">
                        <ul className="list-group list-group-flush label-list ">
                        {this.renderItems()}
                        </ul>
                    </div>
                    <div className="right-div">
                        <img src={this.state.image.img_url} alt={this.state} className="label-img"></img>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          );    
    }
}
