const ship = document.getElementById('Ship');

const limitGameWindow = (top, left) => {
  const rightEdge = document.documentElement.scrollWidth - 139;
  const bottomEdge = document.documentElement.scrollHeight - 139;
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > rightEdge) left = rightEdge;
  if (top > bottomEdge) top = bottomEdge;
  return [top, left];
}

const rotateShip = deg => {
  document.documentElement.style.setProperty('--orientation', deg);
}

const maintainOrientation = (e, {orientation}) => {
  const Akey = e.keyCode === 65;
  const Dkey = e.keyCode === 68;
  const Wkey = e.keyCode === 87;

  if (Akey && Wkey || Akey) orientation -= 10;
  if (Dkey && Wkey || Dkey) orientation += 10;

  rotateShip(orientation + 'deg');
  return orientation;
}

const accelerateShip = (orientation, top, left) => {

  switch (true) {

    case (0 <= orientation && orientation <= 90):
      window.scroll({top: top -= 90-orientation, left: left += orientation , behavior: 'smooth'});
      [top, left] = limitGameWindow(top, left);
      return {orientation, top, left};

    case (90 < orientation && orientation <= 180):
      window.scroll({top: top += 90 - Math.abs(180 - orientation), left: left += 180-orientation , behavior: 'smooth'});
      [top, left] = limitGameWindow(top, left);
      return {orientation, top, left};

    case (180 < orientation && orientation <= 270):
      window.scroll({top: top += 270 - orientation, left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
      [top, left] = limitGameWindow(top, left);
      return {orientation, top, left};

    case ( 270 < orientation && orientation <= 359):
      window.scroll({top: top -= 90 - Math.abs(360-orientation), left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
      [top, left] = limitGameWindow(top, left);
      return {orientation, top, left};

    default:
      break;
  }
}

const navigateShip = (e, {orientation, top, left}) => {
  const Wkey = e.keyCode === 87;

  orientation = maintainOrientation(e, {orientation});
  return accelerateShip(orientation, top, left);
}

const shipBoundaries = () => {
  return ship.getBoundingClientRect();
}

export {
  limitGameWindow,
  navigateShip,
  shipBoundaries
} 