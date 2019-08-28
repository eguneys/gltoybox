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

  this.commitTile = () => {
    const nextI = ctrl.data.draggable.current.nextIndex;

    if (this.data.placeTiles) {
      this.data.placeTiles.forEach(({ key, tile }) => {
        this.data.tiles[key] = {
          letter: tile.letter
        };
      });

      this.data.next[nextI] = shapeToPosInfo(cu.getShape(cu.randomShapeKey()));
    } else {
      
      // const {shape} = this.data.next[nextI];

      //this.data.next[nextI] = shapeToPosInfo(cu.rotateShape(shape));
    }
  };

  const shapeToPosInfo = (shape) => {
    return {
      shape,
      tiles: cu.shapeToPosMap(shape).map(pos => {
        return {
          color: shape.color,
          letter: cu.randomLetter(),
          pos
        };
      })
    };
  };

  const updateDragInfo = delta => {
    
    const cur = ctrl.data.draggable.current;

    delete this.data.placeTiles;

    if (cur && cur.tiles) {
      if (cur.tiles.every(canPlaceTile)) {
        this.data.placeTiles = cur.tiles;
      }
    }
  };

  const canPlaceTile = tile => {
    if (!tile) return false;

    if (this.data.tiles[tile.key]) {
      return false;
    }
    return true;
  };

  this.update = delta => {

    updateDragInfo(delta);



  };
 
}

