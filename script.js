const backgroundColor = '#FFFFFF';
const snakeColor = '#32CD32';
const foodColor = '#FF0800';
const rockColor = '#5A5A5A'

// Setting up the canvas

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
const S = 20;
const T = canvas.width / S;

// Variable Declaration

var position = [];
var velocity = [];
var food = [];
var rock = [];
let snake = [];
var snakeSpeed = 10;
var score; 
var highScore = 0;
var prevScore = 0;
var difficulty;

// Start and reset buttons, difficulty selector

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const selectDiff = document.getElementById('difficulty')[0];

startButton.addEventListener('click', start);
resetButton.addEventListener('click', start);
selectDiff.addEventListener('change', changeDiff)

function changeDiff() {
    // tied to snakeSpeed, 10, 15, 20 will change the "framerate" below
    // ran out of time to get this to work
}

// Consider making the snake starting position random? 

function start(){

    position = {
        x: 10, 
        y: 10
    };

    velocity = {x: 0, y: 0};

    snake = [
        {x: 8, y: 10},
        {x: 9, y: 10},
        {x: 10, y: 10}
    ];

    randomFood();
    randomRock();
}

// Add in other foods, make legend/key for game in HTML & CSS

function randomFood(){
    food = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }
}

function randomRock(){
    rock = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }
}


document.addEventListener('keydown', keydown);

function keydown(e) {
    switch(e.keyCode) {
        case 37: {
            return velocity = {x: -1, y: 0}
        }
        case 38: {
            return velocity = {x: 0, y: -1}
        }
        case 39: {
            return velocity = {x: 1, y: 0}
        }
        case 40: {
            return velocity = {x: 0, y: 1}
        }
    }
}

setInterval(() => {
    requestAnimationFrame(gameLoop);
}, 1000 / snakeSpeed);


// Code for the game loop 

function gameLoop(){

    score = 0;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = snakeColor;

    for (let cell of snake) {
        context.fillRect(cell.x*S, cell.y*S, S,S);
    }

    context.fillStyle = foodColor;
    context.fillRect(food.x*S , food.y*S, S,S);

    context.fillStyle = rockColor;
    context.fillRect(rock.x*S , rock.y*S, S,S);

    position.x += velocity.x;
    position.y += velocity.y;

    score = snake.length - 3; 
    if (score < 0) {
        score = 0;
    } 

    document.getElementById('score').innerHTML = score;

    if (score >= highScore) {
        highScore = score;
        document.getElementById('highScore').innerHTML = highScore;
    }


// Snake wraps around to the other side of the screen. It could also be made to die if it hits the edge of the screen

    if (position.x < 0){
            position.x = T;
    } else if (position.x >= T) {
            position.x = 0;
    }

    if (position.y < 0){
        position.y = T;
    } else if (position.y >= T) {
        position.y = 0;
    }

// Snake dies if it tries to eat itself -- I was unable to get this part to work 



 // Eating the food adds length to the snake, and calls the randomFood function again to make a new apple
    
    if (position.x === food.x && position.y === food.y) {
        snake.push({...position}); 
        position.x += velocity.x;
        position.y += velocity.y;
        randomFood();
    }

// Eating the rock (wall) kills the snake

    if (position.x === rock.x && position.y === rock.y) {
        prevScore = score;
        document.getElementById('prevScore').innerHTML = prevScore;
        start();
    }

    snake.push({...position});
    snake.shift();
}