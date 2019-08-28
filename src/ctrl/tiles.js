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

  this.dragBlock = (shape) => {
    this.data.current = {
      shape
    };
  };

  this.releaseBlock = () => {
    this.data.current = {};
  };

  this.update = delta => {

    

  };
 
}

