import React from 'react';

function StatusBar({resource, amount}) {

  const setColor = resource => {
    switch (resource) {
      case 'medicine':
        return 'red';

      case 'water':
        return 'blue';
      
      case 'food':
        return 'yellow';
    
      default:
        break;
    };
  }

  const setSize = amount => {
    return amount + 'px'
    // return amount / 10 + '%'
  }
  
  const statusStyle = {
    backgroundColor: setColor(resource),
    width: setSize(amount),
    height: '20px'
  }

  // create function to display message when < certain size;
  // give bar a measurement

  return (
    <div className="Status-bar" style={statusStyle}>

    </div>
  );
}

export default StatusBar;