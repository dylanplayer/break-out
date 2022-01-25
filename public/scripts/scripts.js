/* eslint-disable max-classes-per-file */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

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
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = `rgb(${x * (255 / WIDTH)}, 0, 0)`;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// eslint-disable-next-line max-len
const ball = new Ball(WIDTH / 2, HEIGHT - 55, 3.5 + Math.random() - 0.5, -3.5 + Math.random() - 0.5);

const paddle = new Paddle((WIDTH - 75) / 2, HEIGHT - 10, 75, 10, 7);

// Brick Variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let brickInitalRed = 255 / brickColumnCount;

// Keyboard Variables
let rightPressed = false;
let leftPressed = false;

// Game Variables
const textColor = '#000000';
let score = 0;
const scorePerBrick = 1;
let lives = 2;
const fps = 80;
window.addEventListener('blur', cancelAnimationFrame);

/**
 * Clears the canvas
 */
const clearCanvas = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
};

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
    } else if (lives === 0) {
      // eslint-disable-next-line no-alert
      alert('GAME OVER');
      document.location.reload();
      cancelAnimationFrame();
    } else {
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 55;
      ball.xSpeed = 3.5 + Math.random() - 0.5;
      ball.ySpeed = -3.5 + Math.random() - 0.5;
      lives -= 1;
    }
  }
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;
};

/**
 * All paddle logic
 */
const paddleLogic = () => {
  if (rightPressed && !(paddleX + paddleWidth / 2 > WIDTH - paddleWidth / 2)) {
    paddleX += paddleSpeed;
  } else if (leftPressed && !(paddleX < 0)) {
    paddleX -= paddleSpeed;
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

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

/**
 * Populate bricks list with bricks
 */
const populateBricks = () => {
  const bricks = [];
  for (let i = 0; i < brickColumnCount; i += 1) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j += 1) {
      const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
      const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[i][j] = {
        x: brickX,
        y: brickY,
        isVisible: true,
      };
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
        ctx.beginPath();
        ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
        ctx.fillStyle = `rgb(${brickInitalRed}, 0, 0)`;
        ctx.fill();
        ctx.closePath();
      }
    }
    brickInitalRed += 255 / brickColumnCount;
  }
  brickInitalRed = 255 / brickColumnCount;
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
          score += scorePerBrick;
          if (score === brickColumnCount * brickRowCount) {
            clearCanvas();
            // eslint-disable-next-line no-alert
            alert('You win, congrats!');
            document.location.reload();
          }
        }
      }
    }
  }
};

/**
 * Draw score on canvas
 */
const drawScore = () => {
  ctx.font = '16px Ariel';
  ctx.fillStyle = textColor;
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = '16px Ariel';
  ctx.fillStyle = textColor;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

/**
 * Runs every 10 Miliseconds
 */
const draw = () => {
  clearCanvas();
  // Draw
  ball.draw();
  paddle.draw();
  drawBricks();
  drawScore();
  drawLives();
  // Logic
  ballLogic();
  paddleLogic();
  collisionDetection();
  // Make draw function loop
  setTimeout(() => {
    requestAnimationFrame(draw);
  }, 1000 / fps);
};

draw();
