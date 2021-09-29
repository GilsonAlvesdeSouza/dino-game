const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

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
    let position = 0;
    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
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
            position += 20;
            dino.style.bottom = `${position}px`
        }
    }, 30);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    cactus.classList.add('cactus');
    cactus.style.left = `${cactusPosition}px`
    background.appendChild(cactus);
}
createCactus();
document.addEventListener('keydown', handleKeyUp);