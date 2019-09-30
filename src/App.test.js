import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import Template from '.Template';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Template />, div);
=======

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
>>>>>>> 83939d226c584afcab11261c7abb7af550b03ad4
  ReactDOM.unmountComponentAtNode(div);
});
