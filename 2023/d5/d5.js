const fs = require('fs')

const filename = 'input.txt';

fs.readFile(filename, 'utf8', (err, data) => {
if (err) {
		console.error('cannot read file');
		return;
	}
	const input = data.split('\n');
	const seeds = input[0].split(':')[1].trim().split(' ').map(str => Number(str));

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
	
	const places = seeds.map((seed) => {
		return almanac.reduce(function(accumulator, currentValue) {
			const t = traverse(accumulator, currentValue.ranges);
			return t.length !== 0 ? t[0] : accumulator;
			}, seed); 
	});
	console.log(Math.min.apply(null, places))
});

const traverse = (n, singleMap) => singleMap.map(range => {
	if (range.src <= n && n <= range.src + range.l) {
		const offset = n - range.src;
		return range.dst + offset;
	}
}).filter(e => e !== undefined);
