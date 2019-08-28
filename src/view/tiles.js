import Pool from '../pool';

import * as u from '../util';

import * as gu from '../gutil';
import * as cu from '../ctrl/util';

export default function view(ctrl, g, assets) {

  const { width, height } = ctrl.data.game;

  const tileWidth = width * 0.05;
  const gap = 3;

  const tilesWidth = (tileWidth + gap) * cu.cols,
        tilesHeight = (tileWidth + gap) * cu.rows;

  const letterScale = [tileWidth/10, -tileWidth/10];

  const x = ((width * 0.8) - tilesWidth) * 0.5,
        y = (height - tilesHeight) * 0.5;

  const nX = x + tilesWidth + 20,
        nY = y + tilesHeight * 0.0;

  const letterOffset = 16;

  const emptyPool = new Pool(id =>
    gu.makeQuad(g, {
      name: 'empty' + id,
      program: 'tile',
      uniforms: {},
      width: tileWidth,
      height: tileWidth
    })
  );

  const letterPool = new Pool(id =>
    gu.makeTextDraw(g, assets['glyps'])
  );

  const letters = ['a', 'b', 'c', 'k'];

  const renderNext = (shape, y) => {

    shape.forEach(({ pos, color }) => {
      const tX = nX + pos[0] * (tileWidth + gap),
            tY = nY + pos[1] * (tileWidth + gap) + y;

      let empty = emptyPool.acquire();

      empty({
        translation: [tX, tY],
        width: tileWidth,
        height: tileWidth
      }, {});

      let letter = letterPool.acquire();

      letter('b', {
        translation: [tX + tileWidth * 0.4, tY + tileWidth * 0.4],
        scale: letterScale
      });
    });
  };

  this.render = ctrl => {
    ctrl = ctrl.play.tiles;

    ctrl.data.next.forEach((next, i) => {
      const y = i * tileWidth * 4;
      renderNext(next, y);
    });

    cu.allPos.forEach(pos => {
      let key = cu.pos2key(pos);

      let empty = emptyPool.acquire();
      let tX = x + pos[0] * (tileWidth + gap),
          tY = y + pos[1] * (tileWidth + gap);

      empty({
        translation: [tX, tY]
      }, {});

      // let letter = letterPool.acquire();

      // letter('a', {
      //   translation: [tX + letterOffset, tY + letterOffset],
      //   scale: tileScale
      // });
      
    });
  };

  this.release = () => {
    emptyPool.releaseAll();
    letterPool.releaseAll();
  };
  
}
