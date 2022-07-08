const board = document.querySelector('#board');
const rangeslider = document.getElementById("sliderRange");
const gridItems = document.getElementById('board').getElementsByTagName("div");

for (const gridItem of gridItems) {
    gridItem.addEventListener('mouseover', event => event.target.style.color = "orange")
}
rangeslider.oninput = function() {
    drawBox(this.value)
}

function drawBox (size = 1) {
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`
    let innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        innerHTML += `<div class="box"></div>`;
    }
    board.innerHTML = innerHTML;
}