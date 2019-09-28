import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import Template from './Template';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Template />, document.getElementById('root'));
//ReactDOM.render(<Template />, document.getElementById('root'));
=======
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import Amplify from 'aws-amplify'
import config from './aws-exports'

console.log(Amplify.configure(config))

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> 83939d226c584afcab11261c7abb7af550b03ad4

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
