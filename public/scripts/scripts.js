var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let x = WIDTH / 2;
let y = HEIGHT - 30
let xSpeed = 2;
let ySpeed = -2;

/**
 * Clears the canvas
 */
const clearCanvas = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
}

const draw = () => {
    clearCanvas();
    drawBall();
    x += xSpeed;
    y += ySpeed;

}
setInterval(draw, 10);