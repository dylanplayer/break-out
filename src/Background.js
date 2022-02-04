class Background {
  constructor(WIDTH, HEIGHT, color) {
    this.width = WIDTH;
    this.height = HEIGHT;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Background;
