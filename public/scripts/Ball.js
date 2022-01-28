/* eslint-disable import/prefer-default-export */
class Ball {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = '#000000';
  }

  /**
  * Draws the ball on the canvas
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
