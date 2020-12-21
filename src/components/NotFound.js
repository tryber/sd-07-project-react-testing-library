import React from 'react';
import './not-found.css';

const NotFound = () => (
  <div className="not-found">
    <h2 role="heading">
      {`Page requested ` + `not found`}
      <span role="img" aria-label="Crying emoji"> 😭</span>
    </h2>
    <img
      role="img"          
      className="not-found-image"
      src={`https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`}
      alt="Pikachu crying because the page requested was not found"
    />
  </div>
);

export default NotFound;
