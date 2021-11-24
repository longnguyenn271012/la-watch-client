import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store"

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
