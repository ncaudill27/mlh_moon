const limitGameWindow = (top, left) => {
  const rightEdge = document.documentElement.scrollWidth - 139;
  const bottomEdge = document.documentElement.scrollHeight - 139;
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > rightEdge) left = rightEdge;
  if (top > bottomEdge) top = bottomEdge;
  return [top, left];
}

const maintainOrientation = (e, orientation) => {
  const Akey = e.keyCode === 65;
  const Dkey = e.keyCode === 68;
  const Wkey = e.keyCode === 87;

  if (Akey && Wkey || Akey) {
    return orientation - 10;
  } else if (Dkey && Wkey || Dkey) {
    return orientation + 10;
  } else if (Wkey) {
    return orientation;
  }
}

export {
  limitGameWindow
} 