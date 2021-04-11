class Grid 
{
    constructor()
    {
        this.buildings = [];
        this.neighborhoods = [];
        this.generateBuildings();
        this.people = this.getEmptyPeople();
        this.houses = this.generateHouses();
        this.generatePopulation();
        this.deaths = 0;
        this.tombstones = [];
    }

    update() {
        for (let i = 0; i < GRID_SIZE; i ++)  {
            for (let j = 0; j < GRID_SIZE; j ++) {
                if (this.people[i][j] != 0) {
                    this.people[i][j].clearUpdate();
                }
            }
        }

        for (let i = 0; i < GRID_SIZE; i ++)  {
            for (let j = 0; j < GRID_SIZE; j ++) {
                if (this.people[i][j] != 0) {
                    let person = this.people[i][j]
                    if (person.dead)
                    {
                        this.people[i][j] = 0;
                        this.tombstones.push([i,j]);
                        this.deaths++;
                    }
                    else if (!person.hasUpdated())
                        person.update(this.people, this.houses, this.buildings)
                }
            }
        }
    }

    generateHouses()
    {
        for (let i = 0; i < NUM_NEIGHBORHOODS; i++)
        {
            let validLocation = false;
            let x;
            let y;
            
            while(!validLocation)
            {
                validLocation = true
                x = Math.floor(Math.random() * NEIGHBORHOOD_WIDTH)
                y = Math.floor(Math.random() * NEIGHBORHOOD_WIDTH)

                for(let i = 0; i < NUM_BUILDINGS; i++)
                {
                    if(x * 10 == this.buildings[i][0] && y * 10 == this.buildings[i][1])
                    {
                        validLocation = false;
                    }
                }

                if (!(this.neighborhoods.filter((a) => (a[0] == x && a[1] == y)).length < 1 ))
                {
                    validLocation = false
                }
            } 
                this.neighborhoods.push([x * (GRID_SIZE / NEIGHBORHOOD_WIDTH), y * (GRID_SIZE / NEIGHBORHOOD_WIDTH)])
            
        }

        let houses = []
        for (let i = 0; i < NUM_NEIGHBORHOODS; i++)
        {
            for (let j = 0; j < (POPULATION_SIZE / (NUM_NEIGHBORHOODS * HOUSE_SIZE)); j++)
            {
                let x = gaussianRandom(0, NEIGHBORHOOD_WIDTH / HOUSE_SIZE - 1)
                let y = gaussianRandom(0, NEIGHBORHOOD_WIDTH / HOUSE_SIZE - 1)

                if (houses.filter((a) => (a[0] == x && a[1] == y)).length < 1)
                {
                    x = (x * 2) + this.neighborhoods[i][0];
                    y = (y * 2) + this.neighborhoods[i][1];
                    houses.push([x, y])
                }
            }
        }
        return houses
    }

    generateBuildings()
    {
        let checkLocations = [];
        for (let i = 0; i < NUM_BUILDINGS; i++)
        {

            let x = Math.floor(Math.random() * BUILDING_WIDTH);
            let y = Math.floor(Math.random() * BUILDING_WIDTH);

            checkLocations = this.buildings.concat(this.neighborhoods)
            if (checkLocations.filter((a) => (a[0] == x && a[1] == y)).length < 1)
            {
                this.buildings.push([x * 10, y * 10])
            }
        }
    }

    generatePopulation()
    {
        for (let x = 0; x < this.houses.length; x++)// in this.getHouses())
        {
            for (let i = 0; i < 2; i ++) {
                for (let j = 0; j < 2; j++) {
                    let h = [this.houses[x][0] + i, this.houses[x][1] + j]
                    this.people[h[0]][h[1]] = new Person(h);
                }
            }
        }
    }

    getHouses()
    {
        return this.houses;
    }

    getPeople()
    {
        return this.people;
    }

    getBuildings() 
    {
        return this.buildings;
    }

    getDeaths()
    {
        return this.deaths;
    }

    getCurrentInfectedAmount(returnDecimal)
    {
        let allPeople = this.getPeople()
        let amtOfPeople = 0;
        let amtOfInfectedPeople = 0;

        for (let i = 0; i < 100; i ++) {
            for (let j = 0; j < 100; j ++) {
                 if (allPeople[i][j] != 0){
                    if (allPeople[i][j].infected)
                        amtOfInfectedPeople++;
                    
                    amtOfPeople++;
                 }
             }
         }

        DEATH_RATE = INITIAL_DEATH_RATE + ((amtOfInfectedPeople / amtOfPeople) / 10);
        
        if (returnDecimal) {
            console.log(amtOfInfectedPeople, amtOfPeople)
            return amtOfInfectedPeople / amtOfPeople;
        }

        return `${floor(amtOfInfectedPeople/amtOfPeople * 100)} % (${amtOfInfectedPeople}/${amtOfPeople})`;
    }

    getEmptyPeople()
    {
        let people = [];

        for (let i = 0; i < GRID_SIZE; i++)
        {
            people.push([]);
            for (let j = 0; j < GRID_SIZE; j++)
            {
                people[i].push(0);
            }
        }
        return people;
    }

}

function gaussianRand() {
    var rand = 0;
  
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
  
    return rand / 6;
  }

  function gaussianRandom(start, end) {
    return Math.floor(start + gaussianRand() * (end - start + 1));
  }