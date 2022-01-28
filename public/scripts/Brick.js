class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
