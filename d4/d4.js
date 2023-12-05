const fs = require('fs')

const filename = 'input.txt';

fs.readFile(filename, 'utf8', (err, data) => {
	if (err) {
		console.error('cannot read file');
		return;
	}
	const scratchCards = data.split('\n').filter(line => line !== '').map(line => {
		return line.slice(line.indexOf(':') + 1)
			.trim()
			.split('|')
			.map(o => o.trim()
				.split(' ')
				.filter(o => o !== '')
				.map(str => Number(str))
			);
	});
	// console.log(scratchCards);

	const sum = scratchCards.map(sc => {
		return sc[1].map(s => sc[0].includes(s))
			.filter(o => o === true).length
	}).filter(o => o !== 0)
	.map(o => Math.pow(2, o-1))
	.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	console.log(sum);
});
