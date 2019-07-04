import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// REDUX 
import Reducer from './redux/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const Userdata = createStore(Reducer)

ReactDOM.render(
    <Provider store={Userdata}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
