class Grid 
{
    constructor()
    {
        this.num_grids = 100;
        this.num_buildings = 20;
        this.num_neighborhoods = 10;
        this.population_size = 200;
        this.house_size = 2;
        

        this.cells = [];
        
        for (let i = 0; i < 100; i++)
        {
            this.cells.push([])
            for (let j = 0; j < 100; j++)
            {
                this.cells[i].push(new Cell());
            }
        }

        this.neighborhoods = [];
        this.houses = this.generateHouses()
        this.people = this.generatePopulation();

    }



    generateHouses()
    {
        let neighborhood_width = 10
        for (let i = 0; i < this.num_neighborhoods; i++)
        {

            let x = Math.floor(Math.random() * (neighborhood_width - 1))
            let y = Math.floor(Math.random() * (neighborhood_width - 1))

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
            for (let j = 0; j < (this.population_size / (this.num_neighborhoods * this.house_size**2)); j++)
            {
                let x = Math.floor(Math.random() * (neighborhood_width / house_width))
                let y = Math.floor(Math.random() * (neighborhood_width / house_width))

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

    generatePopulation()
    {
        let people = []
        for (let x = 0; x < this.houses.length; x++)// in this.getHouses())
        {
            for (let i = 0; i < 2; i ++) {
                for (let j = 0; j < 2; j++) {
                    let h = [this.houses[x][0] + i, this.houses[x][1] + j]
                    this.cells[h[0]][h[1]].newPerson(h);
                    people.push(h);
                }
            }
        }
        return people;
    }

    getHouses()
    {
        return this.houses;
    }

    getPeople()
    {
        return this.people;
    }


}