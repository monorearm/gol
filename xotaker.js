class Xotaker extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = xotakerArr
        this.energy = 5
    }


    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 10) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new Xotaker(newX, newY)
            xotakerArr.push(xt)

        }
    }

    move() {
        this.getNewDirections();
        var empty = random(this.chooseCell(0))
        if (empty) {
            this.energy--;
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            getEntityByPos(food).die();
            swap([this.x, this.y], food);
            this.energy += 2
        }
    }


    next_tick() {
        this.mult()
        this.move()
        this.eat()
        if (this.energy <= 0) {
            this.die();
        }
    }
}