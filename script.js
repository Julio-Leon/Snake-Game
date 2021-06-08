console.log("Hello World");

const BOARD_COLOR = "blue";
const SNAKE_COLOR = "green";
const FOOD_COLOR = "red";

let gameOn = true;

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

class Snake {
    constructor () {
        this.x = 12;
        this.y = 7;
        this.vel = 1;
        this.snake = [
            [this.x, this.y],
        ];
        this.color = "green";
        this.snakeHead = this.snake[0];
        this.eat = false;
    }
    createSnake () {
        const snakeSquare = document.querySelector(`.row-${this.snake[0][1]}_col-${this.snake[0][0]}`);
        snakeSquare.classList.add("snake");
        snakeSquare.style.backgroundColor = this.color;
        changeState(snakeSquare);
    }
    move(direction) {
        
        if (direction === "up") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][1] -= this.vel;
            } else {
                this.snake[0][1] -= this.vel;
            }
        }
        if (direction === "down") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][1] += this.vel;
            } else {
                this.snake[0][1] += this.vel;
            }
        }
        if (direction === "right") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][0] += this.vel;
            } else {
                this.snake[0][0] += this.vel;
            }
        }
        if (direction === "left") {
            if (this.snake.length > 1) {
                for (let i = this.snake.length - 1; i > 0; i--) {
                    this.snake[i][0] = this.snake[i - 1][0];
                    this.snake[i][1] = this.snake[i - 1][1];
                }
                this.snake[0][0] -= this.vel;
            } else {
                this.snake[0][0] -= this.vel;
            }
        }
    }
    snakeAte(board) {
        this.snake.push([board.food[0], board.food[1]]);
        // console.log(this.snake.length);
        board.food.pop();
        board.food.pop();
        document.querySelector(".food").classList.remove("food");
        this.eat = false;
    }
    update(board) {
        if (this.eat) {
            this.snakeAte(board);
        }
        
        try {
            if (document.querySelector(`.row-${this.snake[0][1]}_col-${this.snake[0][0]}`).classList.contains("snake")) {
                console.log("You crashed!");
                // gameOn = false;
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
                // gameOn = false;
            }
        });

        if (this.snake[this.snake.length - 1][0] === board.food[0] && this.snake[this.snake.length - 1][1] === board.food[1]) {
            this.eat = true;
        }
    }
}

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
        const x = Math.ceil(Math.random() * 25);
        const y = Math.ceil(Math.random() * 50);

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

const newBoard = new Board();
const newSnake = new Snake();
newSnake.createSnake();

document.addEventListener('keydown', (event) => {
    var key = event.key;

    if (key === "ArrowLeft") {
        newSnake.move("left");
    }
    if (key === "ArrowRight") {
        newSnake.move("right");
    }
    if (key === "ArrowDown") {
        newSnake.move("down");
    }
    if (key === "ArrowUp") {
        newSnake.move("up");
    }

    // while (gameOn) {
        newSnake.update(newBoard);
        newBoard.update();
    // }

});


