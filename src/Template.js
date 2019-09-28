import React from 'react';
//import './template.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import './Template.css';

function Template() {
  return (
    <div className="row">
      <div className="column" id="firstCol">
        <br />
        <Button variant="primary">My Profile</Button>
        <br />
        <br />
        <Button variant="primary">Settings</Button>
        <br />
        <br />
        <Button variant="primary">Log out</Button>
        <br />
        </div>
      <div className="column" id="secCol">
        One if three columns
      </div>
      <div className="column" id="thirdCol">
        One of three columns
      </div>
    </div>
  );
}


export default Template;
