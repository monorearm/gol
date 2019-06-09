class Creeper extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = creeperArr
        this.energy = 15

    }



    move() {
        this.getNewDirections();
        var freeCells = this.chooseCell(0).concat(this.chooseCell(1));
        var cell = random(freeCells);
        if (cell) {
            this.energy--;
            swap([this.x, this.y], cell);
        }
    }



    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            getEntityByPos(food).die();
            swap([this.x, this.y], food);
            this.energy += 3
        }
    }


    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy >= 35) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var cr = new Creeper(newX, newY)
            creeperArr.push(cr)
        }
    }


    bang() {
        var damaged = this.directions
        for (var i in damaged) {
            var pos = damaged[i]
            var entity = getEntityByPos(pos);
            if (entity !== null) {
                entity.die();
                this.die();
            }
        }
    }


    next_tick() {
        this.move()
        this.eat()
        this.mult()
        if (this.energy <= 0) {
            this.die();
            this.bang()
        }
    }
}