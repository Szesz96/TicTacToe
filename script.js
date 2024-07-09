const gameBoard = document.querySelector('.gameboard');
const infoDisplay = document.querySelector('.info');
const newGameBtn = document.querySelector('.new-game')
const circlePointsBoard = document.querySelector('.circle-points')
const crossPointsBoard = document.querySelector('.cross-points')
const startCells = ['', '', '', '', '', '', '', '', ''];
let firstPlayer = 'circle';
let circlePoints = 0;
let corssPoints = 0;

infoDisplay.textContent = 'Circle goes first';

function createBoard() {
	startCells.forEach((_cell, i) => {
		const cellEl = document.createElement('div');
		cellEl.classList.add('square');
		cellEl.id = i;
		cellEl.addEventListener('click', addGo);
		gameBoard.append(cellEl);
	});
}
createBoard();

function addGo(e) {
	const goDisplay = document.createElement('div');
	goDisplay.classList.add(firstPlayer);
	e.target.append(goDisplay);
	firstPlayer = firstPlayer === 'circle' ? 'cross' : 'circle';
	infoDisplay.textContent = `Now is the turn of ${firstPlayer}`;
	e.target.removeEventListener('click', addGo);
	checkScore();
}

function checkScore() {
	const allSquares = document.querySelectorAll('.square');
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// if(allSquares.every(square => square.))

	winningCombos.forEach((array) => {
		const circleWins = array.every((cell) =>
			allSquares[cell].firstChild?.classList.contains('circle')
		);

		if (circleWins) {
			infoDisplay.textContent = 'Circle Wins!';
			infoDisplay.style.color = '#27c541';
			circlePoints += 1;
			circlePointsBoard.textContent = `Circle  points: ${circlePoints}`
			allSquares.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			return;
		}
	});

	winningCombos.forEach((array) => {
		const crossWins = array.every((cell) =>
			allSquares[cell].firstChild?.classList.contains('cross')
		);

		if (crossWins) {
			infoDisplay.textContent = 'Cross Wins!';
			infoDisplay.style.color = '#00aeff';
			corssPoints += 1;
			crossPointsBoard.textContent = `Cross  points: ${corssPoints}`
			allSquares.forEach((square) =>
				square.replaceWith(square.cloneNode(true))
			);
			return;
		}
	});
}

function resetGame() {
	const allCircles = document.querySelectorAll('.circle');
	const allCrosses = document.querySelectorAll('.cross');
		
	allCircles.forEach(circle => {
		circle.parentNode.removeChild(circle);
	});
	allCrosses.forEach(cross => {
		cross.parentNode.removeChild(cross); 
	});
		
	infoDisplay.textContent = 'Circle goes first';
	infoDisplay.style.color = '#47e6b1';
	   
	const allSquares = document.querySelectorAll('.square');
	allSquares.forEach(square => {
		square.addEventListener('click', addGo);
	});
	   
	firstPlayer = 'circle';
}

newGameBtn.addEventListener('click', resetGame)
