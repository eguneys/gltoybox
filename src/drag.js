import * as u from './util';

export function start(s, e) {

  let position = u.eventPosition(e);

  const shape = getShapeAtDomPos(position, s.bounds);
  
  s.draggable.current = {
    epos: position
  };
};

export function cancel(s, e) {
  const cur = s.draggable.current;
  if (cur) {
    delete s.draggable.current;
  }
};

export function move(s, e) {

  if (s.draggable.current) {
    s.draggable.current.epos = u.eventPosition(e);
  }

};

function getShapeAtDomPos(pos, bounds) {
  const left = (pos[0] - bounds.left) / bounds.width,
        top = (pos[1] - bounds.top) / bounds.height;

  console.log(left, top);
  

}
