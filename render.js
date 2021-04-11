function setup() {
    canvas = createCanvas(WIDTH, WIDTH);
    canvas.parent('simulation-window')
    newGrid = new Grid();

    radioFPS1 = select("#one-fps").elt;
    radioFPS15 = select("#fifteen-fps").elt;
    radioFPS30 = select("#thirty-fps").elt;
    radioFPS45 = select("#forty-five-fps").elt;
    radioFPS60 = select("#sixty-fps").elt;
    populationSize = select("#populationSize").elt;
    debug = select("#debug").elt;
    frameRate(15);

    

    time = 0;
    
     
    console.log(radioFPS1)

    radioFPS1.onchange = () => {
        console.log("hi")
        frameRate(1);
    }

    radioFPS15.onchange = () => {
        console.log("hi")
        frameRate(15);
    }

    radioFPS30.onchange = () => {
        console.log("hi")
        frameRate(30);
    }

    radioFPS45.onchange = () => {
        console.log("hi")
        frameRate(45);
    }

    radioFPS60.onchange = () => {
        console.log("hi")
        frameRate(60);
    }
    console.log(newGrid.population_size);

    populationSize.onchange = () => {
        time = 0;
        POPULATION_SIZE = populationSize.value;
        newGrid = new Grid();

    }

    lethality.onchange = () => {
        time = 0;
        DEATH_RATE = lethality.value / 100000;

    }

    // rateInfection.onchange = () => {
        
    //     time = 0;
    //     POPULATION_SIZE = rateInfection.value;
    //     newGrid = new Grid();

    //     console.log("grid pop", newGrid.population_size, rateInfection.value)
    // }

    rateMigration.onchange = () => {
        time = 0;
        MIGRATION_RATE = rateMigration.value / 100;
        // newGrid = new Grid();
    }
}
  
function draw() {
    time++;
    
    background(DARK_GREEN);

    renderStores(newGrid.getBuildings(), debug.checked);
    renderHouses(newGrid.getHouses());
    renderPeople(newGrid.getPeople(), debug.checked);

    if(debug.checked) {
        displayFPS(time);
        console.log("Migration rate:", MIGRATION_RATE, "Lethality:", DEATH_RATE)
    }
    
    
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

function renderStores(getStores, debugging) { 
    getStores.forEach((store) => { 
        drawBuilding(store[0], store[1], BUILDING_SIZE, BROWN)

        if(debugging) {
            showBuildingCoords(store[0], store[1])
        }
    })

    
}

function drawPerson(x, y, person) {
     let rand = Math.random();
    fill(LIGHT_BROWN); // Random color for now.

    if (person.dead) {
        fill(0, 0, 0)
    }
    else if (person.infected) {
        fill(RED)
    }
    ellipse(x * CELL_SIZE + (CELL_SIZE / 2), y * CELL_SIZE + (CELL_SIZE / 2), CELL_SIZE, CELL_SIZE);

    if ( person.mask_wearer){
        fill("#0060A1")
        // ellipse(x * CELL_SIZE + (CELL_SIZE / 2), (y * CELL_SIZE) + ( CELL_SIZE / 2), CELL_SIZE / 2, CELL_SIZE / 2); // cener of dot
        ellipse(x * CELL_SIZE + (CELL_SIZE / 2), ((y + .5) * CELL_SIZE) + ( CELL_SIZE / 3), CELL_SIZE / 2, CELL_SIZE / 2);
        // ellipse(x * CELL_SIZE + (CELL_SIZE / 2), (y * CELL_SIZE) + (2 * CELL_SIZE / 2), CELL_SIZE / 2, CELL_SIZE / 2);


    }
}

function renderHouses(getHouses) {
    getHouses.forEach((house) => { drawBuilding(house[0], house[1], 2, GREEN)});
}

function renderPeople(getPeople, debugging) {
    for (let i = 0; i < 100; i ++) {
       for (let j = 0; j < 100; j ++) {
            if (getPeople[i][j] != 0){
                drawPerson(i,j, getPeople[i][j]);

                if(debugging) {
                    drawDestMarker(getPeople[i][j].destination[0], getPeople[i][j].destination[1], 1, "#FFB6C1")
                    showDestinationCoords(getPeople[i][j].destination[0], getPeople[i][j].destination[1], i, j, getPeople[i][j].infected)
                }
            }
        }
    }
}

function drawDestMarker(x, y, size, color) {
    fill(color);
    rect(x * CELL_SIZE, y * CELL_SIZE, size * CELL_SIZE, size * CELL_SIZE, 1.5);
}

function showDestinationCoords(destX, destY, curX, curY, infected) {
    infected ? stroke(89, 21, 39, 100) : stroke(255, 192, 203, 100);
    line((curX * CELL_SIZE) + CELL_SIZE / 2, (curY * CELL_SIZE) + CELL_SIZE / 2, (destX * CELL_SIZE) + CELL_SIZE / 2, (destY * CELL_SIZE) + CELL_SIZE / 2);
    stroke(0,0,0); // Set it back to black.

    fill(255, 255, 255);
    text(`${destX}, ${destY}`, curX * CELL_SIZE, (curY + 2) * CELL_SIZE);

}

function showBuildingCoords(x, y) {
    fill(BROWN);
    text(`${x}, ${y}`, x * CELL_SIZE, (y * CELL_SIZE) - 1);

}

function drawBuilding(x, y, size, color) {
    fill(color);
    rect(x * CELL_SIZE, y * CELL_SIZE, size * CELL_SIZE, size * CELL_SIZE, CELL_SIZE / 2);
}



function displayFPS(tick) {
    fill(255, 255, 255);
    text(`FPS: ${floor(frameRate())}`, 0, 10);
}