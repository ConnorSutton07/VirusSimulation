WIDTH = 1000;
GRID_SCALER = 100;
CELL_SIZE = WIDTH / GRID_SCALER;
RED = '#591527';
BROWN = '#674C47';
LIGHT_BROWN = '#BC987E';
GREEN = '#BFEDCA';
DARK_GREEN = '#85A68E';


function setup() {
    createCanvas(WIDTH, WIDTH);
}
  
function draw() {
    background('#85A68E');
    // renderStores();
    renderHouses(grid);
    // renderPeople();
    

}

function renderPeople(grid) { //receives the Grid class
    for (let i = CELL_SIZE/2; i < WIDTH; i += CELL_SIZE) {
        for (let j = CELL_SIZE/2; j < WIDTH; j += CELL_SIZE) {
            let tempDraw = Math.random();
            if (tempDraw < 0.05) {
              drawPerson(i, j);
            }
            // drawPerson(i, j); 
        }
    }
}

function renderStores(grid) { //receives the Grid class
    for (let i = CELL_SIZE/2; i < WIDTH; i += CELL_SIZE) {
        for (let j = CELL_SIZE/2; j < WIDTH; j += CELL_SIZE) {
            let tempDraw = Math.random();
            drawBuilding(50, 50, 10);
        }
    }
}

function drawPerson(x, y) {
     let rand = Math.random();
    fill(rand < 0.50? RED : LIGHT_BROWN);
    ellipse(x, y, CELL_SIZE, CELL_SIZE);
}

function renderHouses(grid) { //receives the Grid class
    let homes  = grid.getHomes();
    homes.forEach((home) => { drawBuilding(50, 50, 2)});
}

function drawBuilding(x, y, size) {
    fill(BROWN);
    rect(x * CELL_SIZE, y * CELL_SIZE, size * CELL_SIZE, size * CELL_SIZE, CELL_SIZE / 2);
}
