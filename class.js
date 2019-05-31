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






class Grass extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = grassArr
        this.multiply = 0

    }



    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 0) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
        }
    }

    next_tick() {
        this.mult()
    }
}




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

class Predator extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = predatorArr
        this.energy = 10

    }


    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var pr = new Predator(newX, newY)
            predatorArr.push(pr)
        }
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
        var foodNear = this.chooseCell(2).concat(this.chooseCell(5))
        var food = random(foodNear);
        if (food) {
            getEntityByPos(food).die();
            swap([this.x, this.y], food);
            this.energy += 3
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


var monoremsJointEnergy = 150;

class Monorem extends Entity {
    constructor(x, y) {
        super(x, y)
        this.array = monoremArr
    }

    move() {
        this.getNewDirections();
        var freeCells = this.chooseCell(0).concat(this.chooseCell(1));
        var cell = random(freeCells);
        if (cell) {
            monoremsJointEnergy--;
            swap([this.x, this.y], cell);
        }
    }

    eat() {
        var foodNear = this.chooseCell(1)
        var food = random(foodNear);
        if (food) {
            getEntityByPos(food).die();
            swap([this.x, this.y], food);
            monoremsJointEnergy += 4
        }
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy_per_monorem >= 25) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var mo = new Monorem(newX, newY)
            monoremArr.push(mo)
        }
    }


    die() {
        monoremsJointEnergy -= this.energy_per_monorem;
        super.die();
    }

    get energy_per_monorem() {
        var monoremsCount = this.array.length;
        if (monoremsCount == 0) {
            return 0;
        }
        return monoremsJointEnergy / monoremsCount;
    }





    next_tick() {
        this.move()
        this.eat()
        this.mult()
        if (monoremsJointEnergy <= 0) {
            this.die();
        }
    }
}
