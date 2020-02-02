import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';       // add this
import './index.css';
import {RouteConfigExample} from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RouteConfigExample />, document.getElementById('root'));

serviceWorker.unregister();
