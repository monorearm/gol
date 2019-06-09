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