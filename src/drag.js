import { objFind } from './util2';

import * as u from './util';

export function start(s, e) {

  let position = eventPositionInBounds(e, s.bounds);
  const nextIndex = getNextIndexAtPosition(s, position);

  if (nextIndex) {
    s.draggable.current = {
      nextIndex,
      epos: position
    };
  }
};

export function cancel(s, e) {
  const cur = s.draggable.current;
  if (cur) {
    delete s.draggable.current;
  }
};

export function move(s, e) {
  const cur = s.draggable.current;

  if (cur) {
    cur.epos = eventPositionInBounds(e, s.bounds);
    const { tiles } = s.views.next[cur.nextIndex];

    cur.tiles = tiles.map(_ => getTileKeyAtPosition(s, _));
  }

};

function eventPositionInBounds(e, bounds) {
  let position = u.eventPosition(e);
  return [position[0] - bounds.left,
          position[1] - bounds.top];
}

function getTileKeyAtPosition(s, pos) {
  const views = s.views;

  return objFind(views.tiles, (key, tile) => {
    return isInside(tile, pos.x + pos.width * 0.5, pos.y + pos.height * 0.5);
  });
}


function getNextIndexAtPosition(s, pos) {
  const views = s.views,
        left = pos[0],
        top = pos[1];


  return Object.keys(views.next).find(key => {
    const { tiles } = views.next[key];

    return tiles.some(box => {
      if (isInside(box, left, top)) {
        return true;
      }
      return false;
    });
  });
}

function isInside(box, x, y) {
  return box.x < x && box.x + box.width > x &&
    box.y < y && box.y + box.height > y;
}
