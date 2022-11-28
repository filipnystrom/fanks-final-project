import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {

  return (
    <Link to="/">
     <button type="button">
          HOME
     </button>
 </Link>
  )
} 

export default BackButton;