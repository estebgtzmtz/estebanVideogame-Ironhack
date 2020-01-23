const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let obstacles = [];
const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let interval;
let randomIndex;
let frames = 0;
let lifes = 70;
let score = 0;

const imgs = {
    background: './images/background.png',
    sprite: './images/sprite.png',
    logo: './images/logo.png',
    enemy: './images/enemy.png',
}

const music = {
    soundtrack: './music/pokemon.mp3'
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
        this.audio = new Audio();
        this.audio.src = music.soundtrack;
        this.audio.loop = true;
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
        this.key =  lettersArray[randomIndex];
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
}

const getRandomIndex = () => {
    randomIndex = Math.floor(Math.random() * 25);
}

const drawLetter = () => {;
    let letra = lettersArray[randomIndex];
    if(letra===undefined){
        ctx.font = "90px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(``, canvas.width - 430, 320);
    }else{
        ctx.font = "90px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`${letra}`, canvas.width - 430, 320);
    }
}

const drawLife = () => {;
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Jolteon Power: ${lifes}`, canvas.width - 550, canvas.height-30);
}

const drawInstructions1 = () => {
    ctx.font = "70px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Press the correct key `, canvas.width-700, 80);
}

const drawInstructions2 = () => {
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`to keep alive Jolteon`, canvas.width-600, 130);
}
const checkCollitions = () => {
    obstacles.forEach((obstacle) => {
        if (hero.isTouching(obstacle)) {
            lifes--;
        }
    })
}

const gameOver = () => {
    if (lifes === 0) {
        background.audio.pause();
        clearInterval(interval);
        const title = "GAME OVER"
        ctx.fillStyle = 'red'
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(title, (canvas.width / 2) - 200, 300);
        obstacles = [];
    }

}

const background = new Background();
const hero = new Hero();
const logo = new Logo();

document.addEventListener('keydown', ({ keyCode }) => {
    let keyPressed = String.fromCharCode(keyCode).toUpperCase();
    if (keyCode >= 65 && keyCode <= 90) {
        obstacles.splice(0,1);
        /*for(let i=0; i<=obstacles.length; i++){
            if(obstacles[i].key === keyPressed){
            }
        } */  
    }
})

const startGame = () => {
    if (interval) return;
    background.audio.play();
    interval = setInterval(update, 1000 / 20);
}

const update = () => {
    frames++;
    if (frames % 50 === 0) {
        createEnemy();
        getRandomIndex();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    background.goRight();
    logo.draw();
    hero.draw();
    hero.goLeft();
    drawInstructions1();
    drawInstructions2();
    drawObstacles();
    drawLetter();
    drawLife();
    checkCollitions();
    gameOver();
}


window.onload = function() {

    document.getElementById("start-button").onclick = function() {
        if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen()
        } else {
            canvas.mozRequestFullScreen()
        }
        startGame();
    };
};