import Pool from '../pool';

import * as cu from './util';
import * as u from '../util';

export default function tiles(ctrl, g) {

  this.init = d => {
    this.data = {
      tiles: {},
      next: [
        shapeToPosInfo(cu.getShape(cu.randomShapeKey())),
        shapeToPosInfo(cu.getShape(cu.randomShapeKey()))
      ]
    };
  };

  const shapeToPosInfo = (shape) => {
    return cu.shapeToPosMap(shape).map(pos => {
      return {
        color: shape.color,
        pos
      };
    });
  };

  const updateDragInfo = delta => {
    
    const cur = ctrl.data.draggable.current;

    delete this.data.placeTiles;

    if (cur) {
      if (cur.tiles.every(canPlaceTile)) {
        this.data.placeTiles = cur.tiles;
      }
    }
  };

  const canPlaceTile = tile => {
    if (!tile) return false;
    return true;
  };

  this.update = delta => {

    updateDragInfo(delta);



  };
 
}

