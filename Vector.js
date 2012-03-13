function Vector(coords) {
    // this.coords = coords;
    this.x = coords[0];
    this.y = coords[1];
    this.z = coords[2];
}

Vector.prototype = {
    add: function (vec) {
        return new Vector([this.x + vec.x, this.y + vec.y, this.z + vec.z]);
    },
    subtract: function (vec) {
        return new Vector([this.x - vec.x, this.y - vec.y, this.z - vec.z]);
    },
    multiply: function (vec) {
        return new Vector([this.x * vec.x, this.y * vec.y, this.z * vec.z]);
    },
    divide: function (vec) {
        return new Vector([this.x / vec.x, this.y / vec.y, this.z / vec.z]);
    },
    equals: function (vec) {
        return this.x === vec.x && this.y === vec.y && this.z === vec.z;
    },
    clone: function () {
        return new Vector([this.x, this.y, this.z]);
    }
};

module.exports = Vector;
