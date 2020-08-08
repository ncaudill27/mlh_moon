const limitGameWindow = (top, left) => {
  const rightEdge = document.documentElement.scrollWidth - 139;
  const bottomEdge = document.documentElement.scrollHeight - 139;
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > rightEdge) left = rightEdge;
  if (top > bottomEdge) top = bottomEdge;
  return [top, left];
}

const maintainOrientation = (e, {orientation}) => {
  const Akey = e.keyCode === 65;
  const Dkey = e.keyCode === 68;
  const Wkey = e.keyCode === 87;

  if (Akey && Wkey || Akey) {
    orientation -= 10;

  } else if (Dkey && Wkey || Dkey) {

    orientation += 10;
  };

  rotateShip( orientation + 'deg' );
}

const rotateShip = deg => {
  document.documentElement.style.setProperty('--orientation', deg);
}

const accelerateShip = orientation => {

  let {top, left} = this.state;
  switch (true) {

    case (0 <= orientation && orientation <= 90):
      window.scroll({top: top -= 90-orientation, left: left += orientation , behavior: 'smooth'});
      this.setShipPosition(top, left);
      break;

    case (90 < orientation && orientation <= 180):
      window.scroll({top: top += 90 - Math.abs(180 - orientation), left: left += 180-orientation , behavior: 'smooth'});
      this.setShipPosition(top, left);
      break;

    case (180 < orientation && orientation <= 270):
      window.scroll({top: top += 270 - orientation, left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
      this.setShipPosition(top, left);
      break;

    case ( 270 < orientation && orientation <= 359):
      window.scroll({top: top -= 90 - Math.abs(360-orientation), left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
      this.setShipPosition(top, left);
      break;

    default:
      break;
  }
}

const navigateShip = (e, ship) => {
  const Akey = e.keyCode === 65;

  maintainOrientation(e, ship);
  if (Akey) accelerateShip(ship);
}

export {
  limitGameWindow,
  navigateShip
} 