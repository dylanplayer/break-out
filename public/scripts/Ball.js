// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

/* eslint-disable import/prefer-default-export */
class Ball extends Sprite {
  constructor(x, y, xSpeed, ySpeed, radius = 15, color = '#000000') {
    super(x, y, 0, 0, color);
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
