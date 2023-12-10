const fs = require('fs')

const filename = 'input.txt';

const pipes = ['-', '|', '7', 'L', 'J', 'F'];

const validTarget = (el, d) => {
	const f = (el === "F" && ((d[0] === 0 && d[1] === 1) || (d[0] === -1 && d[1] === 0)));
	const lr = (el === "-" && ((d[0] === 1 && d[1] === 0) || (d[0] === -1 && d[1] === 0)));
	const ud = (el === "|" && ((d[0] === 0 && d[1] === 1) || (d[0] === 0 && d[1] === -1)));
	const svn = (el === "7" && ((d[0] === 1 && d[1] === 0) || (d[0] === 0 && d[1] === 1)));
	const l = (el === "L" && ((d[0] === 0 && d[1] === -1) || (d[0] === -1 && d[1] === 0)));
	const j = (el === "J" && ((d[0] === 1 && d[1] === 0) || (d[0] === 0 && d[1] === -1)));
	// console.log("el: ", el, " d: ", d, [f, lr, ud, svn, l, j].filter(o => o).length > 0)
	return f || lr || ud || svn || l || j;
};

const validSource = (el, d) => {
	if (el === "S") {
		return true;
	}
	const f = (el === "F" && ((d[0] === 0 && d[1] === -1) || (d[0] === 1 && d[1] === 0)));
	const lr = (el === "-" && ((d[0] === 1 && d[1] === 0) || (d[0] === -1 && d[1] === 0)));
	const ud = (el === "|" && ((d[0] === 0 && d[1] === 1) || (d[0] === 0 && d[1] === -1)));
	const svn = (el === "7" && ((d[0] === -1 && d[1] === 0) || (d[0] === 0 && d[1] === -1)));
	const l = (el === "L" && ((d[0] === 0 && d[1] === 1) || (d[0] === 1 && d[1] === 0)));
	const j = (el === "J" && ((d[0] === -1 && d[1] === 0) || (d[0] === 0 && d[1] === 1)));
	// console.log("el: ", el, " d: ", d, [f, lr, ud, svn, l, j].filter(o => o).length > 0)
	return f || lr || ud || svn || l || j;
};


const walk = (x, y, pX, pY, grid) => {
	const adjPipes = [
		y !== 0 ? {pos: [x, y-1], el: grid[y-1][x]} : false,
		x !== 0 ? {pos: [x-1, y], el: grid[y][x-1]} : false,
		x !== grid[0].length - 1 ? {pos: [x+1, y], el: grid[y][x+1]} : false,
		y !== grid.length - 1 ? {pos: [x, y+1], el: grid[y+1][x]} : false,
	].filter(o => o) // filter out falses
	.map(o => pipes.includes(o.el) ? o : false) // filter out dots
	.filter(o => o) // filter out falses
	.filter(o => o.pos[0] !== pX || o.pos[1] !== pY) // filter out previously visited
	.filter(o => {
		const d = [o.pos[0] - x, y - o.pos[1]]
		return validSource(grid[y][x], d) && validTarget(o.el, d);
	});

	if (adjPipes.length === 1) {
		console.log(x, y, adjPipes[0].el)
		return adjPipes[0].pos;
	}

	if (x === pX && y === pY) {
		console.log(x, y, adjPipes[0].el)
		return adjPipes[0].pos;
	}

	console.log(adjPipes);
	return false;
};

fs.readFile(filename, 'utf8', (err, data) => {
	if (err) {
		console.error('cannot read file');
		return;
	}
	const xs = data.indexOf('S') % data.split('\n').length;
	const ys = data.split('\n').map((l, i) => l.includes('S') ? i : false).filter(o => o)[0];
	const grid = data.split('\n').map(o => o.split('')).filter(o => o.length > 0);
	
	let [x, y] = [xs, ys];
	let [pX, pY] = [xs, ys];

	let p = [x, y]

	let steps = 0;

	do {
		p = walk(x, y, pX, pY, grid);
		pX = x;
		pY = y;
		x = p[0];
		y = p[1];
		if (!p) {
			break;
		}
		steps++;
	} while(true);
	console.log(Math.ceil(steps/2));
});

