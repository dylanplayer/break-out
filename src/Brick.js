// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.isVisible = true;
  }

  draw(ctx, color) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
