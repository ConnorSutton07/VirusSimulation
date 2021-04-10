WIDTH = 1000;
GRID_SCALER = 100;
CELL_SIZE = WIDTH / GRID_SCALER;
RED = '#591527';
BROWN = '#674C47';
LIGHT_BROWN = '#BC987E';
GREEN = '#BFEDCA';
DARK_GREEN = '#85A68E';


function setup() {
    let canvas = createCanvas(WIDTH, WIDTH);
    canvas.parent('simulation-window')
    newGrid = new Grid();
    frameRate(3);
    
}
  
function draw() {
    background(DARK_GREEN);
    //renderStores();
    
    renderHouses(newGrid.getHouses());
    renderPeople(newGrid.getPeople())
    //renderRandomPeople();

}

function renderRandomPeople(grid) {
    for (let i = CELL_SIZE/2; i < WIDTH; i += CELL_SIZE) {
        for (let j = CELL_SIZE/2; j < WIDTH; j += CELL_SIZE) {
            let tempDraw = Math.random();
            if (tempDraw < 0.05) {
              drawPerson(i, j);
            }
            // drawPerson(i, j); // Fill the board with people.
        }
    }
}

function renderStores(grid) { 
    drawBuilding(50, 50, 10, BROWN); // Draw single store for now.
}

function drawPerson(x, y) {
     let rand = Math.random();
    fill(rand < 0.50? RED : LIGHT_BROWN); // Random color for now.
    ellipse(x * CELL_SIZE + (CELL_SIZE / 2), y * CELL_SIZE + (CELL_SIZE / 2), CELL_SIZE, CELL_SIZE);
}

function renderHouses(getHouses) {
    getHouses.forEach((house) => { drawBuilding(house[0], house[1], 2, GREEN)});
}

function renderPeople(getPeople) {
    getPeople.forEach((person) => {drawPerson(person[0], person[1])});
}

function drawBuilding(x, y, size, color) {
    fill(color);
    rect(x * CELL_SIZE, y * CELL_SIZE, size * CELL_SIZE, size * CELL_SIZE, CELL_SIZE / 2);
}
