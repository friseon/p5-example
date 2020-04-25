const mainContent = document.querySelector('.main__content');
const mainContentParams = mainContent.getBoundingClientRect();

const randomParams = (width, height, delta, sizeMin, sizeMax) => {
    let currentParams = {
        x: width / 2,
        y: height / 2,
        size: sizeMin,
        strokeColor: 0,
        fillColor: 255,
        sizeDelata: 2
    };

    const direction = {
        x: 1,
        y: 1,
        size: 1
    }

    // изменение направления
    setInterval(() => {
        direction.x = direction.x * (Math.random() > .5 ? 1 : -1);
    }, 5000);
    setInterval(() => {
        direction.y = direction.y * (Math.random() > .5 ? 1 : -1);
    }, 3000);

    // смена цвета
    setInterval(() => {
        const temp = currentParams.fillColor;

        currentParams.fillColor = currentParams.strokeColor;
        currentParams.strokeColor = temp;
    }, 3000);

    // резкое увеличение размера
    setInterval(() => {
        currentParams.sizeDelata = 40;

        setTimeout(() => {
            currentParams.sizeDelata = 2;
        }, 500);
    }, 20000);

    // создаём внезапные провалы, пустые места
    setInterval(() => {
        const temp = currentParams.size;
        currentParams.size = 0;
        currentParams.sizeDelata = 0;

        setTimeout(() => {
            currentParams.size = temp;
            currentParams.sizeDelata = 2;
        }, 1000);
    }, 27000);

    return () => {
        // достигли края справа или слева – меняем направление
        if (currentParams.x + delta * direction.x > width || currentParams.x + delta * direction.x < 0) {
            direction.x = -direction.x;
        }
        // достигли края сверху или снизу – меняем направление
        if (currentParams.y + delta * direction.y > height || currentParams.y + delta * direction.y < 0) {
            direction.y = -direction.y;
        }

        // минимальный размер
        if (currentParams.size < sizeMin) {
            direction.size = 1;
        }
        // максимальный размер
        if (currentParams.size > sizeMax) {
            direction.size = -1;
        }

        // новые параметры
        const newParams = {
            ...currentParams,
            x: currentParams.x + random(0, delta) * direction.x,
            y: currentParams.y + random(0, delta) * direction.y,
            size: currentParams.size + currentParams.sizeDelata * direction.size
        };

        // старые параметры заменяем новыми
        currentParams = newParams;

        return newParams;
    };
}

// получаем функцию, которая будет возвращать новые параметры при вызове
const getParams = randomParams(window.innerWidth, mainContentParams.height, 10, -20, 80);

function setup() {
    let myCanvas = createCanvas(window.innerWidth, mainContentParams.height);

    myCanvas.parent('canvas');

    frameRate(12);
}

function draw() {
    // получаем параметры
    const params = getParams();
    // кладём параметры в константы
    const { x, y, size, fillColor, strokeColor } = params;

    stroke(strokeColor);
    fill(fillColor);
    ellipse(x, y, size, size);
}