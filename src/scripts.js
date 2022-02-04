/* eslint-disable import/extensions */
/* eslint-disable max-classes-per-file */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';
import Background from './Background.js';
import Score from './Score.js';
import Lives from './Lives.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// eslint-disable-next-line max-len
const ball = new Ball(WIDTH / 2, HEIGHT - 55, 3.5 + Math.random() - 0.5, -3.5 + Math.random() - 0.5);
const paddle = new Paddle((WIDTH - 75) / 2, HEIGHT - 10, 75, 10, 7, `rgb(${((WIDTH - 75) / 2) * (255 / WIDTH)}, 0, 0)`);
const background = new Background(WIDTH, HEIGHT, '#cdcdcd');

// Brick Variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let brickColor = 255 / brickColumnCount;

// Keyboard Variables
let rightPressed = false;
let leftPressed = false;

// Game Variables
const scorePerBrick = 1;
const score = new Score(8, 20);
const lives = new Lives(WIDTH - 65, 20, 2);
const fps = 80;

/**
 * All ball logic
 */
const ballLogic = () => {
  // eslint-disable-next-line max-len
  if (ball.x + ball.radius / 2 >= WIDTH - ball.radius / 2 || ball.x - ball.radius / 2 <= 0 + ball.radius / 2) {
    ball.xSpeed *= -1;
  }
  if (ball.y - ball.radius / 2 <= 0 + ball.radius / 2) {
    ball.ySpeed *= -1;
  } else if (ball.y + ball.radius / 2 >= HEIGHT - ball.radius / 2) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.ySpeed *= -1;
    } else if (lives.lives === 0) {
      // eslint-disable-next-line no-alert
      alert('GAME OVER');
      document.location.reload();
      cancelAnimationFrame();
    } else {
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 55;
      ball.xSpeed = 3.5 + Math.random() - 0.5;
      ball.ySpeed = -3.5 + Math.random() - 0.5;
      lives.decrement(1);
    }
  }
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
};

/**
 * All paddle logic
 */
const paddleLogic = () => {
  if (rightPressed && !(paddle.x + paddle.width / 2 > WIDTH - paddle.width / 2)) {
    paddle.x += paddle.speed;
  } else if (leftPressed && !(paddle.x < 0)) {
    paddle.x -= paddle.speed;
  }
};

/**
 * Handles while a key is pressed
 * @param event
 */
const keyDownHandler = (event) => {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

/**
 * Handles when a key is unpressed
 * @param event
 */
const keyUpHandler = (event) => {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

/**
 * Handles when the mouse is moved
 */
const mouseMoveHandler = (event) => {
  const mouseX = event.clientX - canvas.offsetLeft;
  if (mouseX > 0 && mouseX < WIDTH) {
    paddle.x = mouseX - paddle.width / 2;
    paddle.color = `rgb(${paddle.x * (255 / WIDTH)}, 0, 0)`;
  }
};

/**
 * Populate bricks list with bricks
 */
const populateBricks = () => {
  const bricks = [];
  for (let i = 0; i < brickColumnCount; i += 1) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j += 1) {
      const x = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
      const y = (j * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[i][j] = new Brick(x, y, brickWidth, brickHeight);
    }
  }
  return bricks;
};
const bricks = populateBricks();

/**
 * Draws all bricks
 */
const drawBricks = () => {
  for (let i = 0; i < brickColumnCount; i += 1) {
    for (let j = 0; j < brickRowCount; j += 1) {
      if (bricks[i][j].isVisible) {
        bricks[i][j].draw(ctx, `rgb(${brickColor}, 0, 0)`);
      }
    }
    brickColor += 255 / brickColumnCount;
  }
  brickColor = 255 / brickColumnCount;
};

/**
 * Detects collisions with bricks
 */
const collisionDetection = () => {
  for (let i = 0; i < bricks.length; i += 1) {
    for (let j = 0; j < bricks[i].length; j += 1) {
      const brick = bricks[i][j];
      if (brick.isVisible) {
        // eslint-disable-next-line max-len
        if (ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight) {
          ball.ySpeed *= -1;
          bricks[i][j].isVisible = false;
          score.increment(scorePerBrick);
          if (score.score === brickColumnCount * brickRowCount) {
            // eslint-disable-next-line no-alert
            alert('You win, congrats!');
            document.location.reload();
          }
        }
      }
    }
  }
};

const draw = () => {
  background.draw(ctx);
  // Draw Objects
  ball.draw(ctx);
  paddle.draw(ctx);
  drawBricks();
  score.draw(ctx);
  lives.draw(ctx);
  // Logic
  ballLogic();
  paddleLogic();
  collisionDetection();
  // Make draw function loop
  setTimeout(() => {
    requestAnimationFrame(draw);
  }, 1000 / fps);
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);
draw();
