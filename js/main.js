const numberOfObjects = 54;
const canvas_size_x = window.innerWidth;
const canvas_size_y = window.innerHeight;
let floatingObjects = [];
let frameWidth = 40;
let frameHeight = 40;
let frame = 0;
let yAxisFrameRate = 0.5;
let zAxisFrameRate = 0.01;

let ctx = null;
let anim_img = null;


function draw() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d", {
        alpha: false
    });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    for (let i = 0; i < numberOfObjects; i++) {
        floatingObjects.push({
            img: new Image(this.sizeX, this.sizeY),
            source: "./img/sprite" + i.toString() + ".png",
            positionX: getRandomInt(canvas_size_x-100),
            positionY: getRandomInt(canvas_size_y),
            sizeX: 22,
            sizeY: 23,
            speedX: 0.5 * (Math.random() < 0.5 ? -1 : 1),
            frameSpeed: 1,
            frame: 0,
        });
        floatingObjects[i].img.src = floatingObjects[i].source;
    }

    floatingObjects[floatingObjects.length-1].img.onload = function() {
        setInterval("myAnimation()", 40);
    }
}

function myAnimation() {
    
    ctx.clearRect(0, 0, canvas_size_x, canvas_size_y);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

    for (let i = 0; i < floatingObjects.length; i++) {
        if (floatingObjects[i].positionX < -30 || floatingObjects[i].positionX > canvas_size_x - 30) {
            floatingObjects[i].speedX = -floatingObjects[i].speedX;
        }
        if (floatingObjects[i].positionY < -30) {
            floatingObjects[i].positionY = canvas_size_y +30
        }

        floatingObjects[i].positionX += floatingObjects[i].speedX;
        floatingObjects[i].positionY += -(Math.sin(floatingObjects[i].positionX * 0.03));
        console.log("x: ", floatingObjects[0].positionX,"sin: ", Math.sin(floatingObjects[0].positionX * 0.03), "y: ",floatingObjects[0].positionY)
        ctx.translate(floatingObjects[i].positionX + frameWidth / 2, + floatingObjects[i].positionY + frameHeight / 2 );
        ctx.rotate((Math.PI / 180) * frame * zAxisFrameRate);
        ctx.drawImage(floatingObjects[i].img, floatingObjects[i].frame * frameWidth, 0, frameWidth, frameHeight, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
        ctx.rotate(-(Math.PI / 180) * frame * zAxisFrameRate);
        ctx.translate(-floatingObjects[i].positionX - frameWidth / 2, -floatingObjects[i].positionY - frameHeight / 2);
        floatingObjects[i].frameSpeed = (frame % yAxisFrameRate) !== 0 ? 0 : 1;
        frame++;
        floatingObjects[i].frame = (floatingObjects[i].frame + floatingObjects[i].frameSpeed) % (floatingObjects[i].img.naturalWidth / frameWidth);
    }
}


let canvas = document.createElement("canvas");
canvas.width = canvas_size_x;
canvas.height = canvas_size_y;
canvas.id = "canvas";

let canvas2 = document.createElement("div");
canvas2.width = canvas_size_x;
canvas2.height = canvas_size_y;
canvas2.id = "canvas2";

document.getElementsByTagName('body')[0].appendChild(canvas);
document.getElementsByTagName('body')[0].appendChild(canvas2);


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function round(num) {
    return Math.sign(num) * Math.round(Math.abs(num));
}