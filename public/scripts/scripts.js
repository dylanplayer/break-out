var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Ball Variables
let ballX = WIDTH / 2;
let ballY = HEIGHT - 30
const ballRadius = 15;
let ballXSpeed = 2;
let ballYSpeed = -2;


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
    if (ballY + ballRadius / 2 >= HEIGHT - ballRadius / 2|| ballY - ballRadius / 2 <= 0 + ballRadius / 2){
        ballYSpeed *= -1;
    }
    ballX += ballXSpeed;
    ballY += ballYSpeed;
}

/**
 * Runs every 10 Miliseconds
 */
const draw = () => {
    clearCanvas();
    drawBall();
    ballLogic();
}
setInterval(draw, 10);