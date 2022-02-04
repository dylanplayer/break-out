/* eslint-disable import/extensions, max-len, no-alert */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';
import Score from './Score.js';
import Lives from './Lives.js';
import Background from './Background.js';

class Game {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;

    this.scorePerBrick = 1;
    this.score = new Score(8, 20);
    this.lives = new Lives(this.WIDTH - 65, 20, 2);
    this.fps = 80;

    this.ball = new Ball(this.WIDTH / 2, this.HEIGHT - 55, 3.5 + Math.random() - 0.5, -3.5 + Math.random() - 0.5);
    this.paddle = new Paddle((this.WIDTH - 75) / 2, this.HEIGHT - 10, 75, 10, 7, `rgb(${((this.WIDTH - 75) / 2) * (255 / this.WIDTH)}, 0, 0)`);
    this.background = new Background(this.WIDTH, this.HEIGHT, '#cdcdcd');

    this.initBrickVariables();
    this.initControls();
  }

  initBrickVariables() {
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.brickColor = 255 / this.brickColumnCount;
    this.bricks = this.populateBricks();
  }

  initControls() {
    this.rightPressed = false;
    this.leftPressed = false;
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  ballLogic() {
    // eslint-disable-next-line max-len
    if (this.ball.x + this.ball.radius / 2 >= this.WIDTH - this.ball.radius / 2 || this.ball.x - this.ball.radius / 2 <= 0 + this.ball.radius / 2) {
      this.ball.xSpeed *= -1;
    }
    if (this.ball.y - this.ball.radius / 2 <= 0 + this.ball.radius / 2) {
      this.ball.ySpeed *= -1;
    } else if (this.ball.y + this.ball.radius / 2 >= this.HEIGHT - this.ball.radius / 2) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.ySpeed *= -1;
      } else if (this.lives.lives === 0) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
        cancelAnimationFrame();
      } else {
        this.ball.x = this.WIDTH / 2;
        this.ball.y = this.HEIGHT - 55;
        this.ball.xSpeed = 3.5 + Math.random() - 0.5;
        this.ball.ySpeed = -3.5 + Math.random() - 0.5;
        this.lives.decrement(1);
      }
    }
    this.ball.x += this.ball.xSpeed;
    this.ball.y += this.ball.ySpeed;
  }

  paddleLogic() {
    if (this.rightPressed && !(this.paddle.x + this.paddle.width / 2 > this.WIDTH - this.paddle.width / 2)) {
      this.paddle.x += this.paddle.speed;
    } else if (this.leftPressed && !(this.paddle.x < 0)) {
      this.paddle.x -= this.paddle.speed;
    }
  }

  keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(event) {
    const mouseX = event.clientX - this.canvas.offsetLeft;
    if (mouseX > 0 && mouseX < this.WIDTH) {
      this.paddle.x = mouseX - this.paddle.width / 2;
      this.paddle.color = `rgb(${this.paddle.x * (255 / this.WIDTH)}, 0, 0)`;
    }
  }

  populateBricks() {
    const bricks = [];
    for (let i = 0; i < this.brickColumnCount; i += 1) {
      bricks[i] = [];
      for (let j = 0; j < this.brickRowCount; j += 1) {
        const x = (i * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const y = (j * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        bricks[i][j] = new Brick(x, y, this.brickWidth, this.brickHeight);
      }
    }
    return bricks;
  }

  drawBricks(ctx) {
    for (let i = 0; i < this.brickColumnCount; i += 1) {
      for (let j = 0; j < this.brickRowCount; j += 1) {
        if (this.bricks[i][j].isVisible) {
          this.bricks[i][j].draw(ctx, `rgb(${this.brickColor}, 0, 0)`);
        }
      }
      this.brickColor += 255 / this.brickColumnCount;
    }
    this.brickColor = 255 / this.brickColumnCount;
  }

  collisionDetection() {
    for (let i = 0; i < this.bricks.length; i += 1) {
      for (let j = 0; j < this.bricks[i].length; j += 1) {
        const brick = this.bricks[i][j];
        if (brick.isVisible) {
          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {
            this.ball.ySpeed *= -1;
            this.bricks[i][j].isVisible = false;
            this.score.increment(this.scorePerBrick);
            if (this.score.score === this.brickColumnCount * this.brickRowCount) {
              alert('You win, congrats!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  play() {
    this.background.draw(this.ctx);
    this.ball.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.drawBricks(this.ctx);
    this.score.draw(this.ctx);
    this.lives.draw(this.ctx);
    this.ballLogic();
    this.paddleLogic();
    this.collisionDetection();
    setTimeout(() => {
      requestAnimationFrame(this.play.bind(this));
    }, 1000 / this.fps);
  }
}

export default Game;
