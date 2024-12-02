const fs = require('fs')

const filename = 'input.txt';

fs.readFile(filename, 'utf8', (err, data) => {
	if (err) {
		console.error('cannot read file');
		return;
	}
	const histories = data.split('\n')
	.map(history => history.trim().split(' '))
	.filter(o => o.length > 1)
	.map(history => {
		let h = [history];
		let diff = []
		do {
			const l = h.slice(-1)[0];
			diff = l.slice(1).map((v, i) => v - l[i]);
			h.push(diff);
		} while(diff.filter(o => o !== 0).length !== 0);
		return h;
	});

	// console.log(histories);

	const extrapolated = histories.map(history => {
		const h = history.reverse();
		const ex = h.map((o, i) => {
			if (i === 0) {
				o.unshift(0);
				return o;
			}
			o.unshift(o[0] - h[i-1][0]);
			return o;
		});
		return ex.slice(-1)[0].slice(0)[0];
	});

	console.log("extrapolated: ", extrapolated);

	const sum = extrapolated.reduce((a, b) => Number(a) + Number(b));

	console.log("sum: ", sum);
});
