console.log("Hello World");

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
        this.x = 8;
        this.y = 7;
        this.vel = 1;
        this.snake = [
            [this.x, this.y],
            [this.x - 1, this.y - 1]
        ];
        this.color = "green";
        this.snakeHead = this.snake[0];
        this.foodAdder = false;
        this.foodBlock = [];
    }
    createSnake () {
        const snakeSquare = document.querySelector(`.row-${this.snakeHead[1]}_col-${this.snakeHead[0]}`);
        snakeSquare.style.backgroundColor = this.color;
        changeState(snakeSquare);
    }
    move(direction) {
        // const snakeSquare = document.querySelector(`.row-${this.snakeHead[1]}_col-${this.snakeHead[0]}`);
        // snakeSquare.style.backgroundColor = "blue";
        // changeState(snakeSquare);
        
        if (direction === "up") {
            this.snakeHead[1] -= this.vel;
        }
        if (direction === "down") {
            this.snakeHead[1] += this.vel;
        }
        if (direction === "right") {
            this.snakeHead[0] += this.vel;
        }
        if (direction === "left") {
            this.snakeHead[0] -= this.vel;
        }
        // console.log(this.snake);
    }
    foodAte() {
        this.snake.push(this.foodBlock[0]);
        this.foodAdder = false;
    }
    update(foodLocation) {
        if (this.foodAdder) {
            this.foodAte();
        }
        // this.snake.forEach((block) => {
        //     const snakeSquare = document.querySelector(`.row-${block[1]}_col-${block[0]}`);
        //     snakeSquare.style.backgroundColor = this.color;
        //     // changeState(snakeSquare);
        // })
        if (this.snakeHead[1] === foodLocation[0] && this.snakeHead[0] === foodLocation[1]) {
            this.foodAdder = true;
            this.foodBlock.push([this.snakeHead[0], this.snakeHead[1]]);
        }
    }
}

class Board {
    constructor () {
        this.rows = 25;
        this.cols = 50;
        this.food = [14, 39];
        const gameBoard = document.querySelector(".game-board");
        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                const square = document.createElement("div");
                square.style.backgroundColor = "blue";
                gameBoard.appendChild(square);
                square.classList.add(`row-${i}_col-${j}`);
                square.classList.add("square");
                square.style.height = "15px";
                square.style.gridRow = "1fr";
                square.style.gridColumn = "1fr";
            }
        }
    }
    update(snakeArr) {
        document.querySelector(`.row-${this.food[0]}_col-${this.food[1]}`).style.backgroundColor = "red";

        const squares = document.querySelectorAll(".square");
        for (let square of squares) {
            for (let i = 0; i < snakeArr.length - 1; i++) {
                if (square.classList.contains(`row-${snakeArr[i][1]}_col-${snakeArr[i][0]}`)) {
                    console.log(snakeArr[i]);
                    square.classList.add("snake");
                }
            }
        }
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
    newSnake.update(newBoard.food);
    newBoard.update(newSnake.snake);
});


