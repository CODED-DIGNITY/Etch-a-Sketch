const board = document.querySelector("#board");

function drawBoard() {
	console.log("drawing");
	for (let i = 0; i < 64 * 64; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		board.appendChild(pixel);
	}
}

drawBoard();
