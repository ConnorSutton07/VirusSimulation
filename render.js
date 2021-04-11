function setup() {
    canvas = createCanvas(WIDTH, WIDTH);
    canvas.parent('simulation-window')
    newGrid = new Grid();

    // Simulation variables.
    peopleInfected = select("#people-infected");
    deaths = select("#deaths");
    timePassed = select("#time-passed");

    frameRate(15);

    time = 0; 

    oneFPS.onchange = () => {
        frameRate(1);
    }

    fifteenFPS.onchange = () => {
        frameRate(15);
    }

    thirtyFPS.onchange = () => {
        frameRate(30);
    }

    fortyFiveFPS.onchange = () => {
        frameRate(45);
    }

    sixtyFPS.onchange = () => {
        frameRate(60);
    }
    console.log(newGrid.population_size);

    populationSize.onchange = () => {
        time = 0;
        POPULATION_SIZE = populationSize.value;
        newGrid = new Grid();
    }

    lethality.onchange = () => {
        DEATH_RATE = lethality.value / 100000;
    }

    rateMigration.onchange = () => {
        MIGRATION_RATE = rateMigration.value / 100;
    }

    rateMasks.onchange = () => {
        MASK_RATE = rateMasks.value / 100;
    }

    infectionDuration.onchange = () => {
        INFECTION_DURATION = infectionDuration.value;
    }

    relaunchSim.onclick = () => {
        time = 0;
        newGrid = new Grid();
    }
}
  
function draw() {
    time++;
    
    background(DARK_GREEN);

    drawAllTombstones(newGrid.tombstones);
    renderStores(newGrid.getBuildings(), debug.checked);
    renderHouses(newGrid.getHouses());
    renderPeople(newGrid.getPeople(), debug.checked);

    if(debug.checked) {
        displayFPS(time);
        console.log("Migration rate:", MIGRATION_RATE, "Lethality:", DEATH_RATE)
    }

    // Statistics
    peopleInfected.html(newGrid.getCurrentInfectedAmount());
    deaths.html(newGrid.getDeaths());
    timePassed.html(formatTime(time * (123/748)));
    
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

function formatTime(totalMinuts) {
    let days = totalMinuts / 1440;
    let rDays = floor(days);
    let hours = (days - rDays) * 24;
    let rHours = floor(hours);
    let minuts =  (hours - rHours) * 60;
    let rMinuts = floor(minuts);
    // let seconds =  (minuts - rMinuts) * 60;
    // let rSeconds = floor(seconds);

    return `${rDays} days ${rHours} hours ${rMinuts} minuts`;
}

function drawAllTombstones(tombstones) {
    tombstones.forEach((t) => drawTombstone(t[0], t[1]));
}

function drawTombstone(x, y) {
    fill("#3c5463");
    rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE * 0.80 , CELL_SIZE, CELL_SIZE / 2, CELL_SIZE / 2, 0 ,0);

    stroke("#658396")
    // vertical line.
    line((x * CELL_SIZE) + (CELL_SIZE * 0.80) / 2, (y * CELL_SIZE) + (CELL_SIZE * 0.1), (x * CELL_SIZE) + (CELL_SIZE * 0.80) / 2, (y * CELL_SIZE) + (CELL_SIZE * 0.9));
    // horizontal line.
    line((x * CELL_SIZE) + (CELL_SIZE * 0.10), (y * CELL_SIZE) + (CELL_SIZE * .40), (x * CELL_SIZE) + (CELL_SIZE * 0.70), (y * CELL_SIZE) + (CELL_SIZE * .40));
    stroke(0,0,0); // Set strokes back to black.
}