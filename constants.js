// Grid
GRID_SIZE           = 100;

NUM_BUILDINGS       = 10;
BUILDING_WIDTH      = 10;

NUM_NEIGHBORHOODS   = 10;
NEIGHBORHOOD_WIDTH  = 10;

HOUSE_SIZE          = 2;
var POPULATION_SIZE = document.getElementById('populationSize').value;


// People

var MASK_RATE            = document.getElementById('rateMasks').value / 100;
var MIGRATION_RATE       = document.getElementById('rateMigration').value / 100;
var DEATH_RATE           = document.getElementById('lethality').value / 100000;
var INFECTION_DURATION   = document.getElementById('infectionDuration').value;
// var SOCIAL_DISTANCE_RATE = document.getElementById('socialDistancing').value / 100;


// Rendering

WIDTH = 1000;
GRID_SCALER = 100;
CELL_SIZE = WIDTH / GRID_SCALER;
BUILDING_SIZE = 10
RED = '#591527';
BROWN = '#674C47';
LIGHT_BROWN = '#BC987E';
GREEN = '#BFEDCA';
DARK_GREEN = '#85A68E';
