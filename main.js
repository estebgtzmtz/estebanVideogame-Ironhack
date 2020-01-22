const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const obstacles = [];
const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let interval;
let randomIndex;
let frames = 0;
let lifes = 70;

const imgs = {
    background: './images/background.png',
    sprite: './images/sprite.png',
    logo: './images/logo.png',
    enemy: './images/enemy.png'

}

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.img = new Image();
        this.img.src = imgs.background;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x - this.width, this.y, this.width, this.height);
    }
    goRight() {
        this.x += 10;
        if (this.x > canvas.width) this.x = 0;
    }
}

class Logo {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.width = 400;
        this.height = 150;
        this.img = new Image();
        this.img.src = imgs.logo;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}


class Hero {
    constructor() {
        this.x = canvas.width - 450;
        this.y = canvas.height - 220;
        this.width = 120;
        this.height = 100;
        this.sx = 1500;
        this.sy = 0;
        this.img = new Image();
        this.img.src = imgs.sprite;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        if (this.sx < 0) this.sx = 1500;
        ctx.drawImage(this.img, this.sx, this.sy, 500, 500, this.x, this.y, this.width, this.height)
    }
    goLeft() {
        this.x += .05;
        this.move();

    }
    move() {
        this.sx -= 500;
    }
    attack() {
        this.sx = 0;
    }
    isTouching(obstacle) {
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        )
    }
}

class Enemy {
    constructor() {
        this.x = 20;
        this.y = canvas.height - 250;
        this.width = 100;
        this.height = 120;
        this.sx = 0;
        this.sy = 0;
        this.key = lettersArray[randomIndex];
        this.img = new Image();
        this.img.src = imgs.enemy;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        if (this.sx > 3600) this.sx = 0;
        this.x += 10;
        ctx.drawImage(this.img, this.sx, this.sy, 450, 627, this.x, this.y, this.width, this.height)
        this.move();
    }
    move() {
        this.sx += 450;
    }
}

const createEnemy = () => {
    obstacles.push(new Enemy());
}

const drawObstacles = () => {
    obstacles.forEach(enemy => enemy.draw());
    console.log(obstacles);
}

const getRandomIndex = () => {
    randomIndex = Math.floor(Math.random() * 25)
    console.log(lettersArray[randomIndex]);
}

const drawLetter = () => {;
    ctx.font = "100px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`${lettersArray[randomIndex]} `, canvas.width - 430, 300);
}

const eliminateEnemy = (key, idx) => {
    if (key === Enemy.key) {
        obstacles.splice(idx, 1);
    }
}

const checkCollitions = () => {
    obstacles.forEach((obstacle) => {
        if (hero.isTouching(obstacle)) {
            lifes--;
            console.log(lifes);
        }
    })
}

const background = new Background();
const hero = new Hero();
const logo = new Logo();

const update = () => {
    frames++;
    if (frames % /*Math.floor((Math.random() * (70 - 40) + 40))*/ 50 === 0) {
        createEnemy();
        getRandomIndex();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    background.goRight();
    logo.draw();
    hero.draw();
    hero.goLeft();
    drawObstacles();
    drawLetter();
    checkCollitions();
    if (lifes === 0) {
        clearInterval(interval);
    }
}

window.onload = function() {
    document.addEventListener('keydown', ({ keyCode }) => {
        if (keyCode < 100) {
            eliminateEnemy();
        }
    })

    const startGame = () => {
        interval = setInterval(update, 1000 / 20);
    }

    document.getElementById("start-button").onclick = function() {
        startGame();
    };
};