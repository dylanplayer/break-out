var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Ball Variables
let ballX = WIDTH / 2;
let ballY = HEIGHT - 55
const ballRadius = 15;
let ballXSpeed = 2;
let ballYSpeed = -2;

// Paddle Variables
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (WIDTH - paddleWidth) / 2;
const paddleY = HEIGHT - paddleHeight;
let paddleSpeed = 7;

// Keyboard Variables
let rightPressed = false;
let leftPressed = false;

/**
 * Clears the canvas
 */
const clearCanvas = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/**
 * Draws the ball on the canvas
 */
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

/**
 * All ball logic
 */
const ballLogic = () => {
    if (ballX + ballRadius / 2 >= WIDTH - ballRadius / 2 || ballX - ballRadius / 2 <= 0 + ballRadius / 2){
        ballXSpeed *= -1;
    }
    if (ballY - ballRadius / 2 <= 0 + ballRadius / 2){
        ballYSpeed *= -1;
    } else if (ballY + ballRadius / 2 >= HEIGHT - ballRadius / 2) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballYSpeed *= -1;
        } else {
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval)
        }
    }
    ballX += ballXSpeed;
    ballY += ballYSpeed;
}

/**
 * Draw Paddle
 */
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

/**
 * All paddle logic
 */
const paddleLogic = () => {
    if (rightPressed && !(paddleX + paddleWidth / 2 > WIDTH - paddleWidth / 2)) {
        paddleX += paddleSpeed;
    } else if (leftPressed && !(paddleX < 0)) {
        paddleX -= paddleSpeed;
    }
}

/**
 * Handles while a key is pressed
 * @param event 
 */
const keyDownHandler = (event) => {
    if (event.key == 'Right' || event.key == 'ArrowRight') {
        rightPressed = true;
    } else if (event.key == 'Left' || event.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

/**
 * Handles when a key is unpressed
 * @param event 
 */
const keyUpHandler = (event) => {
    if (event.key == 'Right' || event.key == 'ArrowRight') {
        rightPressed = false;
    } else if (event.key == 'Left' || event.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler)

/**
 * Runs every 10 Miliseconds
 */
const draw = () => {
    clearCanvas();
    // Draw
    drawBall();
    drawPaddle();
    //Logic
    ballLogic();
    paddleLogic();
}
let interval = setInterval(draw, 10);