var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Ball Variables
let ballX = WIDTH / 2;
let ballY = HEIGHT - 55;
const ballRadius = 15;
let ballXSpeed = 3.5 + Math.random() - 0.5;
let ballYSpeed = -3.5 + Math.random() - 0.5;
let ballColor = '#000000';

// Paddle Variables
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (WIDTH - paddleWidth) / 2;
const paddleY = HEIGHT - paddleHeight;
let paddleSpeed = 7;
let paddleColor = `rgb(${paddleX * (255 / WIDTH)}, 0, 0)`;

// Brick Variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let brickInitalRed = 255 / brickColumnCount;

// Keyboard Variables
let rightPressed = false;
let leftPressed = false;

// Score Variables
let score = 0;
let scorePerBrick = 1;
let lives = 3;

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
    ctx.fillStyle = ballColor;
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
            if (lives == 0) {
                alert('GAME OVER');
                document.location.reload();
            } else {
                ballX = WIDTH / 2;
                ballY = HEIGHT - 55;
                ballXSpeed = 3.5 + Math.random() - 0.5;
                ballYSpeed = -3.5 + Math.random() - 0.5;
                paddleX = (WIDTH - paddleWidth) / 2;
                lives -= 1;
            }
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
    ctx.fillStyle = paddleColor;
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

/**
 * Handles when the mouse is moved
 */
const mouseMoveHandler = (event) => {
    let mouseX = event.clientX - canvas.offsetLeft;
    if (mouseX > 0 && mouseX < WIDTH) {
        paddleX = mouseX - paddleWidth / 2;
        paddleColor = `rgb(${paddleX * (255 / WIDTH)}, 0, 0)`;
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

/**
 * Populate bricks list with bricks
 */
const populateBricks = () => {
    let bricks = [];
    for (let i = 0; i < brickColumnCount; i++) {
        bricks[i] = [];
        for (let j = 0; j < brickRowCount; j++) {
            const brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[i][j] = { x: brickX, y: brickY, isVisible: true};
        }
    }
    return bricks;
}
let bricks = populateBricks();

/**
 * Draws all bricks
 */
const drawBricks = () => {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].isVisible){
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
}

/**
 * Detects collisions with bricks
 */
const collisionDetection = () => {
    for (let i = 0; i < bricks.length; i++) {
        for (let j = 0; j < bricks[i].length; j++) {
            let brick = bricks[i][j];
            if (brick.isVisible) {
                if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
                    ballYSpeed *= -1;
                    bricks[i][j].isVisible = false;
                    score += scorePerBrick;
                    if (score == brickColumnCount * brickRowCount) {
                        alert('You win, congrats!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

/**
 * Draw score on canvas
 */
const drawScore = () => {
    ctx.font = '16px Ariel';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

const drawLives = () => {
    ctx.font = '16px Ariel';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

/**
 * Runs every 10 Miliseconds
 */
const draw = () => {
    clearCanvas();
    // Draw
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    //Logic
    ballLogic();
    paddleLogic();
    collisionDetection();
    // Make draw function loop
    requestAnimationFrame(draw);
}

draw();