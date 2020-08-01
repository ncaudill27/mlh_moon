import React, { useEffect } from 'react';

function Planet({water, medicine, food, fuel, orbit, size, id}) {

  // useEffect(() => {
  //   document.getElementById(id).style.setAttribute('--color', `cmyk(${water}, ${medicine}, ${food}, 0)`)
  //   // return () => {
  //   //   cleanup
  //   // };
  // }, []);
  const planetStyle = {
    backgroundColor: `rgb(${water}, ${medicine}, ${food})`,
    width: `${size}px`,
    height: `${size}px`,
  }
  
  return (
    <div className="Planet" id={id} style={planetStyle}>

    </div>
  )
}

export default Planet;