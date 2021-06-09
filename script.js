console.log("Hello World");

const BOARD_COLOR = "blue";
const SNAKE_COLOR = "green";
const FOOD_COLOR = "red";

let gameOn = true;

let difficulty = 150;

const lostModal = document.querySelector(".bg-modal-lost");

const changeState = (block) => {
    if (block.classList.contains("false")) {
        block.classList.remove("false");
        block.classList.add("true");
    } 
    else if (block.classList.contains("true")) {
        block.classList.remove("true");
        block.classList.add("false");
    }
};

class Board {
    constructor () {
        this.rows = 25;
        this.cols = 50;
        this.food = [];
        const gameBoard = document.querySelector(".game-board");
        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                const square = document.createElement("div");
                square.style.backgroundColor = BOARD_COLOR;
                gameBoard.appendChild(square);
                square.classList.add(`row-${i}_col-${j}`);
                square.classList.add("square");
                square.style.height = "15px";
                square.style.gridRow = "1fr";
                square.style.gridColumn = "1fr";
            }
        }
    }
    update() {
        // console.log("BOARD");
        // if (!gameOn) return;
        const squares = document.querySelectorAll(".square");
        for (let square of squares) {
            if (square.classList.contains("snake")) {
                square.style.backgroundColor = SNAKE_COLOR;
            } else if (square.classList.contains("food")) {
                square.style.backgroundColor = FOOD_COLOR;
            } else {
                square.style.backgroundColor = BOARD_COLOR;
            }
        }
        if (this.food.length === 0) {
            this.createFood();
        }
    }
    createFood() {
        let x = Math.ceil(Math.random() * 25);
        let y = Math.ceil(Math.random() * 50);

        while (document.querySelector(`.row-${x}_col-${y}`).classList.contains("snake")) {
            x++;
            y++;
        }

        this.food.push(y);
        this.food.push(x);
        const food = document.querySelector(`.row-${x}_col-${y}`);
        food.classList.add("food");
        food.style.backgroundColor = FOOD_COLOR;
    }
}

class Snake {
    constructor (highestScore=1) {
        this.x = 12;
        this.y = 7;
        this.vel = 1;
        this.dir = "right";
        this.snake = [
            [this.x, this.y],
        ];
        this.color = "green";
        this.snakeHead = this.snake[0];
        this.eat = false;
        this.highestScore = highestScore;
    }
    getScore() {
        return this.snake.length;
    }
    updateHighestScore() {
        if (this.getScore() > this.highestScore) {
            this.highestScore = this.getScore();
        }
    }
    getHighestScore() {
        return this.highestScore;
    }
    createSnake () {
        const snakeSquare = document.querySelector(`.row-${this.snake[0][1]}_col-${this.snake[0][0]}`);
        snakeSquare.classList.add("snake");
        snakeSquare.style.backgroundColor = this.color;
        changeState(snakeSquare);
    }
    move(direction) {
        if (!gameOn) return;
        // console.log("MOVE");
        if (direction === "ArrowUp" && this.dir !== "down") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][1] -= this.vel;
            } else {
                this.snake[0][1] -= this.vel;
            }
            this.dir = "up";
        }
        if (direction === "ArrowDown" && this.dir !== "up") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][1] += this.vel;
            } else {
                this.snake[0][1] += this.vel;
            }
            this.dir = "down";
        }
        if (direction === "ArrowRight" && this.dir !== "left") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][0] += this.vel;
            } else {
                this.snake[0][0] += this.vel;
            }
            this.dir = "right";
        }
        if (direction === "ArrowLeft" && this.dir !== "right") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][0] -= this.vel;
            } else {
                this.snake[0][0] -= this.vel;
            }
            this.dir = "left";
        }
        console.log(this.dir);
    }
    snakeAte(board) {
        this.snake.push([board.food[0], board.food[1]]);
        board.food.pop();
        board.food.pop();
        document.querySelector(".food").classList.remove("food");
        this.eat = false;
    }
    update(board, moveIntervalID, snakeIntervalID, boardIntervalID) {
        // console.log("SNAKE");
        // if (!gameOn) return;

        if (this.eat) {
            this.snakeAte(board);
        }
        
        try {
            if (document.querySelector(`.row-${this.snake[0][1]}_col-${this.snake[0][0]}`).classList.contains("snake")) {
                console.log("You crashed!");
                window.clearInterval(moveIntervalID);
                window.clearInterval(snakeIntervalID);
                window.clearInterval(boardIntervalID);
                lostModal.style.display = "flex";
                gameOn = false;
            }
        } catch (err) {
            console.log("ignore this");
        }

        for (let square of document.querySelectorAll(".snake")) {
            square.classList.remove("snake");
        }
        this.snake.forEach((block) => {
            try {
                document.querySelector(`.row-${block[1]}_col-${block[0]}`).classList.add("snake");
            } catch (err) {
                console.log("You went out of bounds!");
                window.clearInterval(moveIntervalID);
                window.clearInterval(snakeIntervalID);
                window.clearInterval(boardIntervalID);
                lostModal.style.display = "flex";
                gameOn = false;
            }
        });

        if (this.snake[this.snake.length - 1][0] === board.food[0] && this.snake[this.snake.length - 1][1] === board.food[1]) {
            this.eat = true;
        }
    }
}

let newBoard = new Board();
let newSnake = new Snake();
newSnake.createSnake();
newBoard.createFood();

const scoreDisplay = document.querySelector(".current-score");
const highestScoreDisplay = document.querySelector(".highest-score");

let moveIntervalID = null;
let snakeIntervalID = null;
let boardIntervalID = null;
let currentScoreIntervalID = null;
let highestScoreIntervalID = null;

const restartBar = document.querySelector(".difficulty-selector");

const selectDifficulty = (event) => {

    if (event.target.classList.contains("easy")) {
        difficulty = 200;
    }

    if (event.target.classList.contains("medium")) {
        difficulty = 150;
    }

    if (event.target.classList.contains("hard")) {
        difficulty = 100;
    }

    if (event.target.classList.contains("insane")) {
        difficulty = 50;
    }

};

document.body.addEventListener('keyup', (event) => {

    window.clearInterval(moveIntervalID);
    window.clearInterval(snakeIntervalID);
    window.clearInterval(boardIntervalID);
    window.clearInterval(currentScoreIntervalID);
    window.clearInterval(highestScoreIntervalID);

    moveIntervalID = window.setInterval(() => {
        newSnake.move(event.key);
    }, difficulty);
    snakeIntervalID = window.setInterval(() => {
        newSnake.update(newBoard, moveIntervalID, snakeIntervalID, boardIntervalID);
    }, difficulty);
    boardIntervalID = window.setInterval(() => {
        newBoard.update();
    }, difficulty);
    currentScoreIntervalID = window.setInterval(() => {
        scoreDisplay.innerText = newSnake.getScore();
    });
    highestScoreIntervalID = window.setInterval(() => {
        newSnake.updateHighestScore();
        highestScoreDisplay.innerText = newSnake.getHighestScore();
    });
});

const form = document.querySelector(".player-name-form");
const modal = document.querySelector(".bg-modal");

const setPlayerName = (event) => {
    event.preventDefault();

    const playerNameInput = document.querySelector(".player-name-input");
    const playerNameDisplay = document.querySelector(".player-name");

    playerNameDisplay.innerText = playerNameInput.value;

    modal.style.display = "none";
};

const restartGame = () => {

    const boardSquares = document.querySelectorAll(".square");
    const gameBoard = document.querySelector(".game-board");

    boardSquares.forEach((square) => {
        gameBoard.removeChild(square);
    });

    newBoard = new Board();
    newSnake = new Snake(Number(highestScoreDisplay.innerText));
    newSnake.createSnake();
    newBoard.createFood();

    gameOn = true;
};

form.addEventListener("submit", setPlayerName);

const restartButton = document.querySelector(".restart-button");

restartButton.addEventListener(("click"), restartGame);

const lostRestartButton = document.querySelector(".restart-lost-button");

const restartOnLost = () => {
    restartGame();
    lostModal.style.display = "none";
}

lostRestartButton.addEventListener("click", restartOnLost);
