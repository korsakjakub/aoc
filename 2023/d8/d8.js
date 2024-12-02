const fs = require('fs')

const filename = 'input.txt';

fs.readFile(filename, 'utf8', (err, data) => {
if (err) {
		console.error('cannot read file');
		return;
	}
	const instructions = data.split('\n')[0].split('');
	const nodes = {};
	data.split('\n').slice(2, -1).map(node => {
		const n = node.split('=')[0].trim();
		const [l, r] = node.split('=')[1].split(',').map(e => e.replace("(", "").replace(")", "").trim());
		nodes[n] = {
			l: l,
			r: r,
		}; 
	});

	let steps = 0;
	let node = "AAA";
	while (node !== "ZZZ") {
		const i = steps % instructions.length;
		node = nodes[node][instructions[i].toLowerCase()]
		steps++;
	}
	console.log("steps: ", steps);
});
