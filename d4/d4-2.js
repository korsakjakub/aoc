const fs = require('fs')

// const filename = 'small.txt';
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
	}).map(sc => {
		return [1, sc[1].map(s => sc[0].includes(s))
			.filter(o => o === true).length]
	});


	for (let i = 0; i < scratchCards.length - 1; i++) {
		const currentElement = scratchCards[i];
		const incrementValue = currentElement[0];
		const countToIncrement = currentElement[1];

		for (let j = 1; j <= countToIncrement && i + j < scratchCards.length; j++) {
			scratchCards[i + j][0] += incrementValue;
		}
	}

	const sum = scratchCards.map(o => {
		return o[0];
	}).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	console.log(sum);
});
