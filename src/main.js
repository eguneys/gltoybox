import defaults from './state';

import { programMap } from './shaders';

import Assets from './assets';

import Graphics from './graphics';
import makeView from './view';
import makeCtrl from './ctrl';
import Loop from 'loopz';

import * as events from './events';

export function app(element, options) {

  const canvas = document.createElement('canvas'),
        gl = canvas.getContext('webgl2');
  element.append(canvas);
  const displayWidth = canvas.clientWidth,
        displayHeight = canvas.clientHeight;
  canvas.width = displayWidth;
  canvas.height = displayHeight;


  new Assets({
    'glyps': 'assets/font_10.png'
  }).start()
    .then(assets => {

      const state = {
        ...defaults(displayWidth, displayHeight),
        bounds: canvas.getBoundingClientRect()
      };

      let graphics = new Graphics(state, gl);

      graphics.makePrograms(programMap);

      let ctrl = new makeCtrl(state, graphics);
      let view = new makeView(ctrl, graphics, assets);

      new Loop(delta => {
        ctrl.update(delta);
        ctrl.data.views = view.render(ctrl);
        graphics.render();
        view.release();
      }, 60).start();

      events.bindDocument(ctrl);


      if (module.hot) {
        module.hot.accept('./ctrl', function() {
          try {
            ctrl = new makeCtrl(state, graphics);
          } catch (e) {
            console.log(e);
          }
        });
        module.hot.accept
        (['./view'], function() 
         {
           try {
             view = new makeView(ctrl, graphics, assets);
           } catch (e) {
             console.log(e);
           }
         });
      }
    });
}
