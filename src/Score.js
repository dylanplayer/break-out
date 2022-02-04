/* eslint-disable import/prefer-default-export */
class Score {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.font = '16px Ariel';
    this.color = '#000000';
  }

  /**
  * Draws the score
  */
  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  /**
   * Increments the score
   */
  increment(amount = 1) {
    this.score += amount;
  }

  /**
   * Resets score to zero
   */
  reset() {
    this.score = 0;
  }
}

export default Score;
