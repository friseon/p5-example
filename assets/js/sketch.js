const mainContent = document.querySelector('.main__content');
const mainContentParams = mainContent.getBoundingClientRect();

console.log(mainContentParams);


function setup() {
    let myCanvas = createCanvas(window.innerWidth, mainContentParams.height);

    myCanvas.parent('canvas');
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}