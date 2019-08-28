import * as u from '../util';

import makeTiles from './tiles';

export default function ctrl(ctrl, g) {

  this.data = ctrl.data;

  this.tiles = new makeTiles(ctrl);

  let play;
  this.init = () => {
    this.data.gameover = 0;
    this.data.level = 0;
    this.data.score = 0;

    this.tiles.init();    
  };

  this.spaceHit = () => {

  };

  const maybeEndPlay = delta => {
    if (this.data.gameover > 0) {
      u.ensureDelay(this.data.gameover, () => {
        this.data.gameover = 0;
        this.data.state = u.States.Over;
      }, 1000);
    }
  };

  const maybeIncreaseLevel = u.withDelay(() => {
    if (this.data.gameover === 0) {
      ctrl.data.level++;
    }
  }, 2000);

  const maybeUpdateScore = delta => {
    
  };

  this.update = delta => {

    maybeIncreaseLevel(delta);
    maybeUpdateScore(delta);
    maybeEndPlay(delta);

    this.tiles.update(delta);
  };
}
