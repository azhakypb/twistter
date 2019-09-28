import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Template from '.Template';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Template />, div);
  ReactDOM.unmountComponentAtNode(div);
});
