const board = document.querySelector("#board");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clearBtn");
const gridToggle = document.querySelector("#gridToggle");
const colorPicker = document.querySelector("#colorPicker");
const gridSize = document.querySelector("#gridSize");
const gridValue = document.querySelector("#gridValue");
const rainbowBtn = document.querySelector(`#rainbowBtn`);

let drawing = false;
let grid = false;
let color = colorPicker.value;
let size = parseInt(gridSize.value);
let rainbowMode = false;

board.addEventListener("pointerdown", (e) => {
	drawing = true;
	board.setPointerCapture(e.pointerId);
	draw(e);
});

board.addEventListener("pointermove", (e) => {
	if (drawing) draw(e);
});

document.addEventListener("pointerup", () => (drawing = false));
board.addEventListener("touchmove", (e) => e.preventDefault(), {
	passive: false,
});

clearBtn.addEventListener("click", () => clearBoard());
gridToggle.addEventListener("click", () => toggleGrid());

colorPicker.addEventListener("input", (e) => (color = e.target.value));
eraser.addEventListener("click", () => (color = "white"));

gridSize.addEventListener("input", () => {
	gridValue.innerText = `${gridSize.value} x ${gridSize.value}`;
	size = gridSize.value;
	drawBoard();
});

rainbowBtn.addEventListener("click", () => {
	if (rainbowMode) color = "black";
	rainbowMode = !rainbowMode;
	rainbowBtn.classList.toggle("active");
});

function toggleGrid() {
	for (const pixel of board.children) {
		pixel.classList.toggle("grid");
	}
	grid = !grid;
}

function draw(e) {
	if (rainbowMode) {
		const randomColor = `hsl(${Math.floor(Math.random() * 360)},70%,50%)`;
		color = randomColor;
	}
	const pixelUnderPointer = document.elementFromPoint(e.clientX, e.clientY);
	if (
		drawing &&
		pixelUnderPointer &&
		pixelUnderPointer.classList.contains("pixel")
	) {
		pixelUnderPointer.style.backgroundColor = color;
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
		if (grid) pixel.classList.add("grid");
		pixel.style.width = `calc(100% / ${size})`;
		pixel.style.height = `calc(100% / ${size})`;
		board.appendChild(pixel);
	}
}

drawBoard();
