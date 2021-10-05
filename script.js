const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let position = 0;

const keyMap = {
    space: 32,
    arrowUP: 38
}

let isJumping = false;

let handleKeyUp = (event) => {
    if (event.keyCode === keyMap.arrowUP || event.keyCode === keyMap.space) {
        if (!isJumping) {
            jump();
        }
    }
};

function jump() {
    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = `${position}px`
                }
            }, 30);
        } else {

            //subindo
            position += 20;
            dino.style.bottom = `${position}px`
        }
    }, 30);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = `${cactusPosition}px`
    background.appendChild(cactus);

    //movimento do cactus
    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
             clearInterval(leftInterval);
             document.body.innerHTML = `<h1 class="game-over">Fim de Jogo</h1>`;
        }else{
            cactusPosition -= 10;
            cactus.style.left = `${cactusPosition}px`;
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyUp);