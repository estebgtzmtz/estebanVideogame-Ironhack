const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;

const imgs = {
    background: './images/background.png',
    sprite: './images/sprite.png'
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
    }
}

class Hero {
    constructor() {
        this.x = (canvas.width / 2) - 80;
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
        ctx.drawImage(this.img, this.sx, this.sy, 500, 500, this.x, this.y, this.width, this.height)
    }
    goLeft() {
        this.x -= 20;
        this.move();
    }
    move() {
        this.sx -= 500;
    }
}

const background = new Background();
const hero = new Hero();

const update = () => {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    hero.draw();
}

document.getElementById("start-button").onclick = function() {
    startGame();
};

document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            return hero.goLeft();
    }
})

const startGame = () => {
    interval = setInterval(update, 1000);
}