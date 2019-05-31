var matrix = []
var side = 7;
var grassArr = [];
var xotakerArr = [];
var predatorArr = [];
var creeperArr = [];
var monoremArr = [];


const WIDTH = 50
const HEIGHT = 50

function getArrayById(id) {
    if (id == 0) {
        return null
    }
    var arrays = [grassArr, xotakerArr, predatorArr, creeperArr, monoremArr];
    return arrays[id - 1];
}

function isPosCorrect(pos) {
    return (0 <= pos[0] && pos[0] < WIDTH && 0 <= pos[1] && pos[1] < HEIGHT);
}

function getEntityByPos(pos) {
    if (!isPosCorrect(pos)) {
        return null;
    }
    var x = pos[0];
    var y = pos[1];
    var kindId = matrix[y][x];
    var array = getArrayById(kindId);
    if (array === null) {
        return null;
    }
    for (var i in array) {
        var entity = array[i];
        if (entity.x == x && entity.y == y) {
            return entity;
        }
    }
}

function swap(pos1, pos2) {
    var [[x1, y1], [x2, y2]] = [pos1, pos2];
    var entity1 = getEntityByPos(pos1)
    var entity2 = getEntityByPos(pos2)

    if (entity1 !== null) {
        [entity1.x, entity1.y] = pos2
    }

    if (entity2 !== null) {
        [entity2.x, entity2.y] = pos1
    }

    var id1 = matrix[y1][x1]
    var id2 = matrix[y2][x2]

    var id1 = matrix[y1][x1];
    var id2 = matrix[y2][x2];
    matrix[y1][x1] = id2;
    matrix[y2][x2] = id1
}


function setup() {


    for (var y = 0; y < WIDTH; y++) {
        matrix[y] = []
        for (var x = 0; x < HEIGHT; x++) {
           matrix[y][x] = random([0,0,0,0,1,1,1,2,2,3,4,5])
        }
    }
    

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y)
                xotakerArr.push(xt)
            }

            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y)
                predatorArr.push(pr)
            }

            else if (matrix[y][x] == 4) {
                var cr = new Creeper(x, y)
                creeperArr.push(cr)
            }

            else if (matrix[y][x] == 5) {
                var mo = new Monorem(x, y)
                monoremArr.push(mo)
            }


        }
    }

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}




function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }

            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 4) {
                fill("#003399")
            }

            else if (matrix[y][x] == 5) {
                fill("white")
            }


            rect(x * side, y * side, side, side)


        }
    }

    var entities = [].concat(grassArr, xotakerArr, predatorArr, creeperArr, monoremArr)
    

    for (var i in entities) {
        var entity = entities[i]
        if (entity.alive) {
            entities[i].next_tick()
        }
    }
}