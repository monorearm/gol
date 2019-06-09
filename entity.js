class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.getNewDirections();
        this.alive = true;
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]

        this.directions = this.directions.filter(isPosCorrect)

    }

    chooseCell(character) {
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (isPosCorrect([x, y])) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;

    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in this.array) {
            if (this.array[i].x == this.x && this.array[i].y == this.y) {
                this.array.splice(i, 1)
                this.alive = false;
            }
        }
    }
}