/* eslint-disable import/prefer-default-export */
class Lives {
  constructor(x, y, startingLives) {
    this.x = x;
    this.y = y;
    this.startingLives = startingLives;
    this.lives = startingLives;
    this.font = '16px Ariel';
    this.color = '#000000';
  }

  /**
  * Draws the score
  */
  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  /**
   * Increments the score
   */
  decrement(amount = 1) {
    this.lives -= amount;
  }

  /**
   * Resets score to zero
   */
  reset() {
    this.lives = this.startingLives;
  }
}

export default Lives;
