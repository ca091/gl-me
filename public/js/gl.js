function radToDeg(r) {
	return r * 180 / Math.PI;
}

function degToRad(d) {
	return d * Math.PI / 180;
}

function isPowerOf2(value) {
	return (value & (value - 1)) == 0;
}

function rand(min, max) {
	if(typeof max === 'undefined'){
		max = min;
		min = 0;
	}
	return Math.random() * (max - min) + min;
}

var G = {
	radToDeg: degToRad,
	degToRad: degToRad,
	rand: rand,
	isPowerOf2: isPowerOf2
};