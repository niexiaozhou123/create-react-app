import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router/router.js';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
