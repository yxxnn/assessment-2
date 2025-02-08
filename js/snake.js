// eugh

const gameArea = document.getElementById('snakeGame');
const food = document.getElementById('food');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const messageDisplay = document.getElementById('message');
let snake = [{x: 100, y: 100}]; // oops set this to static by accident
let direction = {x: 20, y: 0};
let score = 0;
let gameinterval;

if (localStorage.getItem('snakeOver')) {
    messageDisplay.innerText = 'You have already played. Come against tomorrow!';
    startButton.style.display = 'none';
}

function addFood() {
    // easier to play
    const xMargin = 20;
    const yMargin = 20;

    const xMax = gameArea.clientWidth - xMargin;
    const yMax = gameArea.clientHeight - yMargin;

    const x = Math.floor((Math.random() * (xMax - xMargin)) / 20) * 20 + xMargin;
    const y = Math.floor((Math.random() * (yMax - yMargin)) / 20) * 20 + yMargin;
    food.style.left = `${x}px`;
    food.style.top = `${x}px`;
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); 

    if (head.x === food.offsetLeft && head.y === food.offsetTop) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        addFood();
    } else {
        snake.pop();
    }

    if (colideCheck(head)) {
        clearInterval(gameinterval);
        localStorage.setItem("snakeOver", true);
        alert("Game Over!! Your Score: " + score);
        document.location.reload();
    }

    draw();
}

function colideCheck(head) {
    const oob = head.x < 0 || head.x >= gameArea.clientWidth || head.y < 0 || head.y >= gameArea.clientHeight;
    const colideself = snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
    
    return oob || colideself;
}

function draw() {
    gameArea.innerHTML = "";
    snake.forEach(segment => {
        const snakePart = document.createElement('div');
        snakePart.className = 'snake';
        snakePart.style.left = `${segment.x}px`;
        snakePart.style.top = `${segment.y}px`;
        gameArea.appendChild(snakePart);
    });
    gameArea.appendChild(food);
}

function startGame() {
    snake = [{x: 100, y: 100}];
    direction = {x: 20, y:0};
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    gameArea.style.display = 'block';
    addFood();
    gameinterval = setInterval(moveSnake, 200);

}

document.addEventListener("DOMContentLoaded", function () {
    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp': // i never knew u could do this lol
            case 'w':
                if (direction.y === 0) {
                    direction = { x: 0, y: -20 };
                }
                break;
            case 'ArrowDown':
            case 's':
                if (direction.y === 0) {
                    direction = { x: 0, y: 20 };
                }
                break;
            case 'ArrowLeft':
            case 'a':
                if (direction.x === 0) {
                    direction = { x: -20, y: 0 };
                }
                break;
            case 'ArrowRight':
            case 'd':
                if (direction.x === 0) {
                    direction = { x: 20, y: 0 };
                }
                break;
        }
    });
});