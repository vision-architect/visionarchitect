 // frontend/src/App.js

 import React from "react";
 import Datasets from "./components/dataset";
 import Dataset from "./components/dataset_detail";
 import Images from "./components/image"
 import Labeller from "./components/labeller"

 import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// routes specifies urls handled by frontend and associated components to render
 const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/images/:pk",
    component: Images
  },
  {
    path: "/label-images/:pk",
    component: Labeller
  },
  {
    path:"/datasets",
    component: Datasets
  },
  {
    path:"/dataset/:pk",
    component: Dataset
  }
];

export function RouteConfigExample() {
  return (
    <Router>
      <div>
            <Link className="text-white" to="/images">Images</Link>
            &emsp; 
            <Link className="text-white" to="/datasets">Datasets</Link>
        <Switch>
          {routes.map((route, i) => (
            <RouteWith {...route} />
          ))}
        </Switch>
        
      </div>
    </Router>
  );
}

function RouteWith(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} />
      )}
    />
  );
}

function Home(){
  return <h2> HOME PAGE</h2>
}

 export default RouteConfigExample
