const board = document.querySelector('#board');
const rangeSlider = document.getElementById("sliderRange");
const gridItems = document.querySelector('#board div');
const eraseButton = document.querySelector('.eraser');
const rainbowButton = document.querySelector('.rainbow');
const shadeButton = document.querySelector('.shading');
const lightenButton = document.querySelector('.lighten');
const resetButton = document.querySelector('.reset');
var color = 'black';
let colors = [
    '#ff595e',
    '#ffca3a',
    '#8ac926',
    '#1982c4',
    '#6a4c93',
    '#ef476f',
    '#06d6a0',
    '#b5179e'
];

function drawBox (size = 1) {
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        innerHTML += `<div class="box"></div>`;
    }
    board.innerHTML = innerHTML;
    var gridPixels = board.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
}

function colorGrid () {
    switch (color) {
        case 'rainbow' :
            this.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            this.classList.remove('grey');
            break;

        case 'darker' :
            if(this.style.filter.match(/brightness/i)) {
                let currentBrightness = Number(this.style.filter.match(/[0-9]+/));
                if(currentBrightness > 0) {
                    this.style.filter = `brightness(${currentBrightness - 10}%)`
                }
            } else {
                this.style.filter = "brightness(90%)"
            }
            break;

        case 'lighten' :
            if(this.style.filter.match(/brightness/i)) {
                let currentBrightness = Number(this.style.filter.match(/[0-9]+/));
                if(currentBrightness < 200) {
                    this.style.filter = `brightness(${currentBrightness + 10}%)`
                }
            } else {
                this.style.filter = "brightness(110%)"
            }
            break;

        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('gray');
            break;

        default :
            this.style.backgroundColor = color;
            break;
    }
}

function eraseCanvas () {
    var gridPixels = board.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#fff');
}

function setCurrentColor (selectedColor) {
    switch (selectedColor) { 
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'darker':
            color = 'darker';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        case 'lighten':
            color = 'lighten';
            break;
        default:
            color = 'black';
            break;
    } 
}

colorPicker.oninput = e => setCurrentColor(e.target.value);
resetButton.onclick = eraseCanvas;
eraseButton.onclick = setCurrentColor('eraser');
shadeButton.onclick = setCurrentColor('darker');
lightenButton.onclick = setCurrentColor('lighten');
rainbowButton.onclick = setCurrentColor('rainbow');
rangeSlider.onmouseup = function() { drawBox(this.value) };

window.onload = () => drawBox(10);