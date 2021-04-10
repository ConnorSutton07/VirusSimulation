function setup() {
    let canvas = createCanvas(WIDTH, WIDTH);
    canvas.parent('simulation-window')
    newGrid = new Grid();
    frameRate(15);
}
  
function draw() {
    //background(DARK_GREEN);
    background(LIGHT_BLUE);
    //noStroke();
    renderStores(newGrid.getBuildings());
    renderHouses(newGrid.getHouses());
    renderPeople(newGrid.getPeople());
    
    newGrid.update();

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

function renderStores(getStores) { 
    //drawBuilding(50, 50, 10, BROWN); // Draw single store for now.
    //getStores.forEach((store) => { drawBuilding(store[0], store[1], BUILDING_SIZE, BROWN)})
    getStores.forEach((store) => { drawBuilding(store[0], store[1], BUILDING_SIZE, ORANGE)})
}

function drawPerson(x, y, person) {
     let rand = Math.random();
    //fill(LIGHT_BROWN); // Random color for now.
    fill(YELLOW);
    if (person.dead) {
        fill(0, 0, 0)
    }
    else if (person.infected) {
        //fill(RED)
        fill(RED2);
    }
    ellipse(x * CELL_SIZE + (CELL_SIZE / 2), y * CELL_SIZE + (CELL_SIZE / 2), CELL_SIZE, CELL_SIZE);
}

function renderHouses(getHouses) {
    //noStroke();
    getHouses.forEach((house) => { drawBuilding(house[0], house[1], 2, GREEN2)});
}

function renderPeople(getPeople) {
    //getPeople.forEach((list, index) => {list.forEach(value) => {if value != 0}});
    for (let i = 0; i < 100; i ++) {
       for (let j = 0; j < 100; j ++) {
            if (getPeople[i][j] != 0){
                drawPerson(i,j, getPeople[i][j]);
            }
        }
    }
}

function drawBuilding(x, y, size, color) {
    fill(color);
    rect(x * CELL_SIZE, y * CELL_SIZE, size * CELL_SIZE, size * CELL_SIZE, CELL_SIZE / 2);
}
