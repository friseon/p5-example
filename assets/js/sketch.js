const mainContent = document.querySelector('.main__content');
const mainContentParams = mainContent.getBoundingClientRect();

/**
 * Функция для управления параметрами "шарика"
 * 
 * @param {Number} canvasWidth - ширина холста
 * @param {Number} canvasHeight - высота холста
 * @param {Number} delta - шаг для изменения координаты (максимальное смещение)
 * @param {Number} sizeMin - минимальный размер круга
 * @param {Number} sizeMax - максимальный размер круга
 */
const randomParams = (canvasWidth, canvasHeight, delta, sizeMin, sizeMax) => {
    // задаём изначальные параметры
    let currentParams = {
        x: canvasWidth / 2, // круг изначально отображается в центре холста
        y: canvasHeight / 2, // круг изначально отображается в центре холста
        size: sizeMin, // у него минимальный размер
        strokeColor: 0, // цвет обводки черный
        fillColor: 255, // сам круг белый
        sizeDelata: 2 // шаг для изменения размера круга
    };

    // направление изменений параметров
    // -1 - значение будет уменьшаться
    // 1 - значение будет увеличиваться
    const direction = {
        x: 1,
        y: 1,
        size: 1 // изначальное шарик будет увеличиваться
    }

    // изменение направления
    setInterval(() => {
        // каждые 5 секунд случайно может поменяться или не поменяться направление по координате X
        direction.x = Math.random() > .5 ? 1 : -1;
    }, 5000);
    setInterval(() => {
        // каждые 5 секунд случайно может поменяться или не поменяться направление по координате Y
        direction.y = Math.random() > .5 ? 1 : -1;
    }, 3000);

    // смена цвета
    // каждые 3 секунды меняется на обратный цвет круга и его обводки
    setInterval(() => {
        const temp = currentParams.fillColor;

        currentParams.fillColor = currentParams.strokeColor;
        currentParams.strokeColor = temp;
    }, 3000);

    // резкое увеличение размера
    setInterval(() => {
        currentParams.sizeDelata = 40;

        setTimeout(() => {
            // возвращаем к обычному значению sizeDelata
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

    // возвращаем функцию (getParams в данном случае), вызов которой будет возвращать новые параметры для отрисовки
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
            fillColor: currentParams.fillColor,
            strokeColor: currentParams.strokeColor,
            sizeDelata: currentParams.sizeDelata,
            // random берет случайное значение из диапазона от 0 до delta – получается неровное смещение/отрисовка рисунка
            x: currentParams.x + random(0, delta) * direction.x,
            y: currentParams.y + random(0, delta) * direction.y,
            size: currentParams.size + currentParams.sizeDelata * direction.size,
        };

        // старые параметры заменяем новыми
        currentParams = newParams;

        // возвращаем новые параметры для новой отрисовки
        return newParams;
    };
}

// получаем функцию, которая будет возвращать новые параметры при вызове
const getParams = randomParams(window.innerWidth, mainContentParams.height, 10, -20, 80);

function setup() {
    let myCanvas = createCanvas(window.innerWidth, mainContentParams.height);

    myCanvas.parent('canvas');

    // задаем FPS, отрисовываться у нас будет 12 кадров в секунду
    frameRate(12);
}

// draw – это пофакту 1 кадр
function draw() {
    // получаем параметры
    const params = getParams();
    // кладём параметры в константы
    const { x, y, size, fillColor, strokeColor } = params;

    stroke(strokeColor);
    fill(fillColor);
    ellipse(x, y, size, size);
}