/* eslint-disable import/extensions */
import Game from './Game.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx);

const draw = () => {
  game.play();
};

draw();
