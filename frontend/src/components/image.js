import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import axios from "axios";

export default class Images extends Component{
    onDrop = (files) => {
        const data = new FormData();
        files.forEach(file => {
            data.append(file.name,file);
        })
        data.append('dataset',this.props.match.params.pk)
        axios
        .post("http://localhost:8000/backend1/upload-images/", data);
      }  
        
    render() {
        return (
            <main>
                <h3 className="title"> Upload Images </h3>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop} >
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Upload or drag 'n' drop Images</p>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                </div>
            </main>
          );
    }
}

