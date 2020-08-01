import React, { useEffect } from 'react';

function Planet({water, medicine, food, fuel, orbit, size, id}) {

  // useEffect(() => {
  //   document.getElementById(id).style.setAttribute('--color', `cmyk(${water}, ${medicine}, ${food}, 0)`)
  //   // return () => {
  //   //   cleanup
  //   // };
  // }, []);

  return (
    <div className="Planet" id={id} style={{backgroundColor: `cmyk(${water}, ${medicine}, ${food}, 0)`}}>

    </div>
  )
}

export default Planet;