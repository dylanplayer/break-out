// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, color);
    this.speed = speed;
    this.color = color;
  }
}

export default Paddle;
