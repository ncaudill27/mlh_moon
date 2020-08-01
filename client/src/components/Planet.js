import React, { useState } from 'react';

function Planet({water, medicine, food, top, left, size, id}) {

  const [boundaries, setBoundaries] = useState({});

  const planetStyle = {
    backgroundColor: `rgb(${water}, ${medicine}, ${food})`,
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`
  }
  
  return (
    <div className="Planet" id={id} style={planetStyle}>

    </div>
  )
}

export default Planet;