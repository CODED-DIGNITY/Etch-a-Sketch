const board = document.querySelector("#board");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clearBtn");
const gridToggle = document.querySelector("#gridToggle");
const colorPicker = document.querySelector("#colorPicker");
const gridSize = document.querySelector("#gridSize");
const gridValue = document.querySelector("#gridValue");

let drawing = false;
let grid = false;
let color = colorPicker.value;
let size = parseInt(gridSize.value);

board.addEventListener("mousedown", () => (drawing = true));
board.addEventListener("mouseup", () => (drawing = false));
board.addEventListener("mouseleave", () => (drawing = false));

board.addEventListener("mouseover", (e) => draw(e));
board.addEventListener("mousedown", (e) => draw(e));

clearBtn.addEventListener("click", () => clearBoard());
gridToggle.addEventListener("click", () => toggleGrid());

colorPicker.addEventListener("input", (e) => (color = e.target.value));
eraser.addEventListener("click", () => (color = "white"));
gridSize.addEventListener("input", () => {
	gridValue.innerText = `${gridSize.value} x ${gridSize.value}`;
	size = gridSize.value;
	drawBoard();
});

function toggleGrid() {
	for (const pixel of board.children) {
		pixel.classList.toggle("grid");
	}
	grid = !grid;
}

function draw(e) {
	if (drawing && e.target.classList.contains("pixel")) {
		e.target.style.backgroundColor = color;
	}
}

function clearBoard() {
	for (const pixel of board.children) {
		pixel.style.backgroundColor = "white";
	}
}

function drawBoard() {
	board.innerHTML = "";
	console.log("drawing");
	for (let i = 0; i < size * size; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.style.width = `calc(100% / ${size})`;
		pixel.style.height = `calc(100% / ${size})`;
		board.appendChild(pixel);
	}
}

drawBoard();
