const fs = require('fs')

const filename = 'small.txt';

fs.readFile(filename, 'utf8', (err, data) => {
if (err) {
		console.error('cannot read file');
		return;
	}
	const input = data.split('\n');
	const seeds = input[0].split(':')[1].trim().split(' ').map(str => Number(str));
	console.log(seeds)

	const maps = [];
	let tmp = [];
	input.slice(1).filter(s => s !== '').forEach(item => {
		if (item.includes("map")) {
			if (tmp.length > 0) {
				maps.push(tmp);
				tmp = [];
			}
		}
		tmp.push(item);
	});
	if (tmp.length > 0) {
		maps.push(tmp);
	}

	const almanac = maps.map(map => {
		return {
			map: map[0].split(' map:')[0],
			ranges: map.slice(1).map(r => {
				const [dst, src, l] = r.split(' ').map(str => Number(str));
				return {
					dst: dst,
					src: src,
					l: l
				}
			}),
			
		}
	});
	console.log(almanac[0])

	seeds.forEach(seed => traverse(seed, almanac))

});

const traverse = (n, almanac) => {
	
};
