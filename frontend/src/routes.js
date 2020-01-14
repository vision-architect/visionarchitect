import CustomModal from "./components/dataset_modal";
import App from "./App"
import React, { Component } from "react";
import {Switch, Route } from "react-router-dom";
  

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/products" component={CustomModal}/>
            </Switch>
        )
    }
}
 export default Routes;
