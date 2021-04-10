class Grid 
{
    constructor()
    {
        this.num_grids = 100;
        this.num_buildings = 8;
        this.num_neighborhoods = 8;
        this.population_size = document.getElementById('populationSize').value;
        this.house_size = 2;
        this.buildings = [];
        

        this.people = [];
        for (let i = 0; i < this.num_grids; i++)
        {
            this.people.push([]);
            for (let j = 0; j < this.num_grids; j++)
            {
                this.people[i].push(0);
            }
        }

        this.neighborhoods = [];
        this.houses = this.generateHouses();
        this.generateBuildings();
        this.generatePopulation();

    }

    update() {
        for (let i = 0; i < this.num_grids; i ++)  {
            for (let j = 0; j < this.num_grids; j ++) {
                if (this.people[i][j] != 0) {
                    this.people[i][j].update(this.people, this.houses, this.buildings)
                }
            }
        }
    }



    generateHouses()
    {
        let neighborhood_width = 10
        for (let i = 0; i < this.num_neighborhoods; i++)
        {

            let x = Math.floor(Math.random() * neighborhood_width)
            let y = Math.floor(Math.random() * neighborhood_width)


            //this.neighborhoods.push([x * 10, y * 10])
            if (this.neighborhoods.filter((a) => (a[0] == x && a[1] == y)).length < 1)
            {
                this.neighborhoods.push([x * 10, y * 10])
            }

        }

        let house_width = 2;
        let houses = []
        for (let i = 0; i < this.neighborhoods.length; i++)
        {
            for (let j = 0; j < (this.population_size / (this.num_neighborhoods * this.house_size)); j++)
            {
                //let x = Math.floor(Math.random() * (neighborhood_width / house_width))
                //let y = Math.floor(Math.random() * (neighborhood_width / house_width))
                let x = gaussianRandom(0, neighborhood_width / house_width - 1)
                let y = gaussianRandom(0, neighborhood_width / house_width - 1)

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
        let building_width = 10;
        let checkLocations = [];
        for (let i = 0; i < this.num_buildings; i++)
        {

            let x = Math.floor(Math.random() * building_width)
            let y = Math.floor(Math.random() * building_width)

            checkLocations = this.buildings.concat(this.neighborhoods)
            console.log(checkLocations)
            console.log(checkLocations.filter((a) => (a[0] == x && a[1] == y)))
            //this.neighborhoods.push([x * 10, y * 10])
            if (checkLocations.filter((a) => (a[0] == x && a[1] == y)).length < 1)
            {
                this.buildings.push([x * 10, y * 10])
            }
        
        }
        console.log(this.buildings)
        console.log(this.neighborhoods)
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