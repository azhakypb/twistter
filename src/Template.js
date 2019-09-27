import React from 'react';
//import './template.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Template() {
  return (
    <div className="row">
      <div className="column" style="width:33%; padding-left: 1%; position: sticky; top: 0;">
        One of three columns
        <br>
        <button className="btn" ><i class="fas fa-user-cog">Settings</i></button>
        <br>
        <button className="btn" ><i class="fas fa-user">My Profile</i></button>
      </div>
      <div className="column" style="width:47%">
        One if three columns
      </div>
      <div className="column" style="width:20%">
        One of three columns
      </div>
    </div>
  );
}


export default Template;
