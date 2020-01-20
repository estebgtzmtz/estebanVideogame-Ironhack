const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const imgs = {
    background: './images/background.jpg'
}

class Background {
    constructor() {
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = 0;
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
        this.width = 50;
        this.height = 100;
        this.x = canvas.width / 2
    }
}

const background = new Background();

window.onload = function() {

};