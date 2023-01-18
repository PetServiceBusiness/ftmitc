class Grid {
    constructor(length, height, posX, posY) {
        this.length = length;
        this.height = height;
        this.position = new Position(posX, posY);
    }
}

class Position {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    getPosition() {
        return this.posX + ', ' + this.posY;
    }
    check(length, height) {
        if (this.posX > length - 1) {
            this.posX = length - 1;
        }
        if (this.posX < 0) {
            this.posX = 0;
        }
        if (this.posY > height - 1) {
            this.posY = height - 1;
        }
        if (this.posY < 0) {
            this.posY = 0;
        }
    }
}

class Player {
    constructor(playspaceLength=10, playspaceHeight=10, startposX=0, startposY=0) {
        this.playspace = new Grid(playspaceLength, playspaceHeight, startposX, startposY);
    }
    advance(direction) {
        switch(direction) {
            case "UP":
                this.playspace.position.posY += 1;
                this.playspace.position.check(this.playspace.length, this.playspace.height);
                break;
            case "DOWN":
                this.playspace.position.posY -= 1;
                this.playspace.position.check(this.playspace.length, this.playspace.height);
                break;
            case "RIGHT":
                this.playspace.position.posX += 1;
                this.playspace.position.check(this.playspace.length, this.playspace.height);
                break;
            case "LEFT":
                this.playspace.position.posX -= 1;
                this.playspace.position.check(this.playspace.length, this.playspace.height);
                break;
        }
    }
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let player = new Player();
let monster = new Player(10, 10, randomIntFromInterval(4, 9), randomIntFromInterval(4, 9));
let turns = 0;
let finished = false;
let high = 99;
document.getElementById('you-coords').innerHTML = 'YOUR COORDINATES: ' + player.playspace.position.getPosition();
document.getElementById('monster-coords').innerHTML = 'MONSTER\'S COORDINATES: ' + player.playspace.position.getPosition();
  
function move(response) {
    if (finished == true) {
        return;
    }
    else {
        switch(response) {
            case "w":
                player.advance("UP");
                document.getElementById('you-coords').innerHTML = 'YOUR COORDINATES: ' + player.playspace.position.getPosition();
                break;
            case "s":
                player.advance("DOWN");
                document.getElementById('you-coords').innerHTML = 'YOUR COORDINATES: ' + player.playspace.position.getPosition();
                break;
            case "a":
                player.advance("LEFT");
                document.getElementById('you-coords').innerHTML = 'YOUR COORDINATES: ' + player.playspace.position.getPosition();
                break;
            case "d":
                player.advance("RIGHT");
                document.getElementById('you-coords').innerHTML = 'YOUR COORDINATES: ' + player.playspace.position.getPosition();
                break; 
        }
        let rng = randomIntFromInterval(1, 4)
        switch(rng) {
            case 1:
                monster.advance("UP");
                document.getElementById('monster-coords').innerHTML = 'MONSTER\'S COORDINATES: ' + monster.playspace.position.getPosition();
                break;
            case 2:
                monster.advance("DOWN");
                document.getElementById('monster-coords').innerHTML = 'MONSTER\'S COORDINATES: ' + monster.playspace.position.getPosition();
                break;
            case 3:
                monster.advance("LEFT");
                document.getElementById('monster-coords').innerHTML = 'MONSTER\'S COORDINATES: ' + monster.playspace.position.getPosition();
                break;
            case 4:
                monster.advance("RIGHT");
                document.getElementById('monster-coords').innerHTML = 'MONSTER\'S COORDINATES: ' + monster.playspace.position.getPosition();
                break; 
        }
        document.getElementById('steps').innerHTML = ('YOU HAVE TAKEN ' + turns + ' STEPS.');
        if (monster.playspace.position.getPosition() == player.playspace.position.getPosition()) {
            if (turns < high) {
                high = turns;
            }
            document.getElementById('you-coords').innerHTML = '';
            document.getElementById('steps').innerHTML = ('HIGHSCORE: ' + high);
            document.getElementById('monster-coords').innerHTML = ("YOU FOUND THE MONSTER IN " + turns + " STEPS.");
            document.getElementById('up').style.display = 'none';
            document.getElementById('down').style.display = 'none';
            document.getElementById('right').style.display = 'none';
            document.getElementById('left').style.display = 'none';
            document.getElementById('instructions').style.display = 'inline';
            document.getElementById('restart-info').style.display = 'inline';
            finished = true;
        }
        if (turns > 99) {
            if (turns < high) {
                high = turns;
            }
            document.getElementById('monster-coords').innerHTML = 'you got lost in the closet L';
            document.getElementById('steps').innerHTML = 'highscore: ' + high;
            document.getElementById('you-coords').innerHTML = '';
            document.getElementById('up').style.display = 'none';
            document.getElementById('down').style.display = 'none';
            document.getElementById('right').style.display = 'none';
            document.getElementById('left').style.display = 'none';
            document.getElementById('instructions').style.display = 'inline';
            document.getElementById('restart-info').style.display = 'inline';
            finished = true;
        }
        turns += 1;
    }
}

function showInfo() {
    document.getElementById('info').style.display = 'block';
}

function hideInfo() {
    document.getElementById('info').style.display = 'none';
}

function startGame() {
    player = new Player();
    monster = new Player(10, 10, randomIntFromInterval(4, 9), randomIntFromInterval(4, 9));
    turns = 0;
    finished = false;
    document.getElementById('you-coords').innerHTML = '';
    document.getElementById('monster-coords').innerHTML = '';
    document.getElementById('steps').innerHTML = 'YOU HAVE TAKEN 0 STEPS';
    document.getElementById('up').style.display = 'inline';
    document.getElementById('down').style.display = 'inline';
    document.getElementById('right').style.display = 'inline';
    document.getElementById('left').style.display = 'inline';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('restart-info').style.display = 'none';
}