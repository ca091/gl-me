;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['./webgl-utils', './webgl-3d-math'], factory);
	} else {
		// Browser globals
		G = factory.call();
	}
}(function () {
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

	function TRS() {
		this.translation = [0, 0, 0];
		this.rotation = [0, 0, 0];
		this.scale = [1, 1, 1];
	};

	TRS.prototype.getMatrix = function(dst) {
		dst = dst || new Float32Array(16);
		var t = this.translation;
		var r = this.rotation;
		var s = this.scale;
		makeTranslation(t[0], t[1], t[2], dst);
		matrixMultiply(makeXRotation(r[0]), dst, dst);
		matrixMultiply(makeYRotation(r[1]), dst, dst);
		matrixMultiply(makeZRotation(r[2]), dst, dst);
		matrixMultiply(makeScale(s[0], s[1], s[2]), dst, dst);
		return dst;
	};

	function Node(source){
		this.children = [];
		this.localMatrix = makeIdentity();
		this.worldMatrix = makeIdentity();//this.localMatrix * parent.worldMatrix
		this.source = source;
	}
	Node.prototype.setParent = function(parent) {
		// remove us from our parent
		if (this.parent) {
			var ndx = this.parent.children.indexOf(this);
			if (ndx >= 0) {
				this.parent.children.splice(ndx, 1);
			}
		}

		// Add us to our new parent
		if (parent) {
			parent.children.push(this);
		}
		this.parent = parent;
	};

	Node.prototype.updateWorldMatrix = function(matrix) {
		var source = this.source;
		if (source) {
			source.getMatrix(this.localMatrix);
		}
		if (matrix) {
			// a matrix was passed in so do the math
			matrixMultiply(this.localMatrix, matrix, this.worldMatrix);
		} else {
			// no matrix was passed in so just copy.
			copyMatrix(this.localMatrix, this.worldMatrix);
		}

		// now process all the children
		var worldMatrix = this.worldMatrix;
		this.children.forEach(function(child) {
			child.updateWorldMatrix(worldMatrix);
		});
	};

	window.TRS = TRS;
	window.Node = Node;
	return {
		radToDeg: degToRad,
		degToRad: degToRad,
		rand: rand,
		isPowerOf2: isPowerOf2
	};
}));


