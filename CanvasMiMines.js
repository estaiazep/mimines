const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const maxCanvasWidth = 300; // Максимальная ширина канваса 300 пикселей
window.addEventListener('load', resizeCanvas);

let selectIndex = 1;

// Функция для установки размера канваса с учётом прямоугольников 5:7
function resizeCanvas() {
    const totalSpacingFactor = 0.05; // 5% от общего размера на отступы
    const totalSpacing = maxCanvasWidth * totalSpacingFactor; // Общая величина отступов
    const availableWidth = maxCanvasWidth - totalSpacing; // Доступная ширина для прямоугольников

    rectWidth = availableWidth / gridSize; // Вычисляем ширину прямоугольников
    rectHeight = rectWidth * (5 / 7); // Высота с соотношением 5:7
    spacing = totalSpacing / (gridSize - 1); // Отступ между прямоугольниками

    // Рассчитываем высоту канваса на основе высоты прямоугольников
    const totalHeight = gridSize * rectHeight + (gridSize - 1) * spacing;
    canvas.width = maxCanvasWidth; // Фиксированная ширина
    canvas.height = totalHeight; // Динамическая высота

    createGrid(); // Пересоздаем сетку
    drawGrid(); // Перерисовываем сетку
}


// Загрузка изображений
const rectangleImg = new Image();
rectangleImg.src = "../static/MiMInes/resource/CardEllipse.svg";
const starImg = new Image();
starImg.src = "../static/MiMInes/resource/CardStar.svg";

// Кастомизируемые переменные
let gridSize = 5;           // Размер сетки (количество прямоугольников в ряду/столбце)
let rectWidth = 70;         // Ширина прямоугольника с соотношением 7:5
let rectHeight = 50;        // Высота прямоугольника
let spacing = 10;           // Отступы между прямоугольниками
let pieceColor = '#0168CF'; // Цвет прямоугольников и частиц
let flipDuration = 500;     // Время анимации переворота в миллисекундах

const rectangles = [];
const rotatingCards = {}; // Для отслеживания вращающихся карт

// Функция для создания начальной сетки
function createGrid() {
    rectangles.length = 0; // Очистка массива перед пересозданием

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            rectangles.push({
                x: j * (rectWidth + spacing), // Позиция по X с учетом отступов
                y: i * (rectHeight + spacing), // Позиция по Y с учетом отступов
                width: rectWidth,             // Ширина прямоугольника
                height: rectHeight,           // Высота прямоугольника
                color: pieceColor,
                index: i * gridSize + j,
                angle: 0, // Угол поворота
            });
        }
    }
}

// Функция для рисования изображения прямоугольника
function drawRectangleImage(rect) {
    ctx.save();

    const halfWidth = rect.width / 2; // Половина ширины для определения линии оси
    const centerX = rect.x + halfWidth;
    const centerY = rect.y + rect.height / 2;

    ctx.translate(centerX, centerY); // Переносим систему координат к центру карты

    // Поворот карты вокруг вертикальной оси (линией будет вертикальная ось карты)
    ctx.scale(Math.cos(rect.angle * Math.PI / 180), 1); // Имитируем поворот оси Y

    // Рисуем изображение карты (лицевая или рубашка)
    const image = Math.abs(rect.angle) % 360 > 90 && Math.abs(rect.angle) % 360 < 270 ? starImg : rectangleImg;
    ctx.drawImage(image, -halfWidth, -rect.height / 2, rect.width, rect.height);

    ctx.restore();
}

// Функция для рисования сетки
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас перед перерисовкой
    rectangles.forEach(rect => {
        drawRectangleImage(rect); // Рисуем прямоугольники с соотношением 7:5
    });
}

// Функция для анимации переворота карты
function flipCard(index) {
    if (rotatingCards[index]) return; // Если карта уже переворачивается, игнорируем

    const rect = rectangles[index];
    const startAngle = rect.angle;
    const endAngle = startAngle + 180;
    const startTime = performance.now();

    rotatingCards[index] = true; // Отмечаем карту как вращающуюся

    function animate(time) {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / flipDuration, 1); // Прогресс анимации от 0 до 1

        rect.angle = startAngle + progress * (endAngle - startAngle);

        drawGrid();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            rotatingCards[index] = false; // Убираем отметку вращения после завершения
        }
    }

    requestAnimationFrame(animate);
}
// Запуск начальной отрисовки и анимации
createGrid();

function flipRandomCards(count) {
    const totalCards = rectangles.length; // Общее количество карт
    const indices = new Set(); // Используем Set для уникальных индексов
    createGrid(); // Пересоздаем сетку
    drawGrid();
    while (indices.size < count) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        indices.add(randomIndex); // Добавляем уникальный индекс
    }

    // Переворачиваем карты по сгенерированным индексам
    indices.forEach(index => {
        flipCard(index);
    });
}

// Функция для обработки сценариев удаления
function handleScenario(input) {
    switch (input) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            flipRandomCards( getRandomIndex(20));
            break;
        case 6:
            flipRandomCards(getRandomIndex(19));
            break;
        case 7:
            flipRandomCards(getRandomIndex(18));
            break;
        case 8:
            flipRandomCards(getRandomIndex(17));
            break;
        case 9:
            flipRandomCards(getRandomIndex(16));
            break;
        case 10:
            flipRandomCards(getRandomIndex(15));
            break;
        case 11:
            flipRandomCards(getRandomIndex(14));
            break;
        case 12:
            flipRandomCards(getRandomIndex(13));
            break;
        case 13:
            flipRandomCards(getRandomIndex(12));
            break;
        case 14:
            flipRandomCards(getRandomIndex(11));
            break;
        case 15:
            flipRandomCards(getRandomIndex(10));
            break;
        case 16:
            flipRandomCards(getRandomIndex(9));
            break;
        case 17:
            flipRandomCards(getRandomIndex(8));
            break;
        case 18:
            flipRandomCards(getRandomIndex(7));
            break;
        case 19:
            flipRandomCards(getRandomIndex(6));
            break;
        case 20:
            flipRandomCards(getRandomIndex(5));
            break;
        default:
            console.log('Нет сценария для этого значения'); // Обработка неизвестных значений
            break;
    }
}

function getRandomIndex(max) {
    return ((Math.random() * (max-3)+3).toFixed(0));
}

