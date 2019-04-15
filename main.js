const container = document.querySelector("#container");

for (let r = 0; r < 4; ++r) {
    for (let c = 0; c < 4; ++c) {
        let grid_square = document.createElement("div");
        grid_square.classList.add('grid_square');
        grid_square.addEventListener('mouseover', changeColor);
        container.appendChild(grid_square);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeColor(e) {
    e.target.style.backgroundColor = getRandomColor();
}
