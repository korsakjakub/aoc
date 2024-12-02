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

	const startingNodes = Object.entries(nodes).map(node => {
		const s = node[0].endsWith("A");
		return s ? node[0] : false;
	}).filter(o => o);
	
	const steps = startingNodes.map(n => {
		let s = 0;
		let node = n;
		while (!node.endsWith("Z")) {
			const i = s % instructions.length;
			node = nodes[node][instructions[i].toLowerCase()]
			s++;
		}
		return s;
	});
	console.log(lcm(...steps));
});

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};
