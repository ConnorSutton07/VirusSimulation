//Author: Jake Wagner

PERSON_RADIUS = 7;
PERSON_UNINF_COLOR = '#674C47';  
PERSON_INF_COLOR = '#591527';
BASE_BACKGROUND = '#85A68E';
COMPLEMENT_BACKGROUND = '#BFEDCA';
COMPLEMENT_BACKGROUND2 = '#BC987E';

function setup() {
    createCanvas(displayWidth, displayHeight);
}
  
function draw() {
    background(BASE_BACKGROUND);
    draw_background();
    //drawPeople();
}

function draw_background() {
    for( let i = 0; i < 250; i ++) {
        for ( let j = 0; j < 250; j ++) {
            if ((i*7)%3 && (j*3)%4) {
                fill(COMPLEMENT_BACKGROUND);
            }
            else if ((i*4)%5 && (j*7)%2) {
                fill(COMPLEMENT_BACKGROUND2);
            }
            else {
                fill(BASE_BACKGROUND);
            }
            noStroke();
            rect(i * displayWidth/ 250, j * displayHeight/250, 15, 15); 
        }
    }
}

function drawPerson(x, y, color) {
    fill(color);
    //noStroke();
    ellipse(x, y, PERSON_RADIUS, PERSON_RADIUS);
}

function drawPeople(peoples) {
    for (let i = 0; i < peoples.length; i ++) {
        if (peoples[i].infected) {
            drawPerson(peoples[i].x, peoples[i].y, PERSON_INF_COLOR);
        }
        else {
            drawPerson(peoples[i].x, peoples[i].y, PERSON_UNINF_COLOR);
        }
    }
}

