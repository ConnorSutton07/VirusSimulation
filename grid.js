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
        this.neighborhoods = [];
        this.homes = [];

        for (let i = 0; i < this.numGrids; i++)
        {
            this.cells.push([])
            for (let j = 0; j < this.numGrids; j++)
            {
                this.cells[i].push(new Cell);
            }
        }

        this.generateHomes()
    }


    generateHomes()
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
        for (let i = 0; i < this.neighborhoods.length; i++)
        {
            for (let j = 0; j < (this.population_size / this.num_neighborhoods * this.house_size); j++)
            {
                let x = Math.floor(Math.random() * (neighborhood_width / house_width))
                let y = Math.floor(Math.random() * (neighborhood_width / house_width))

                if (this.homes.filter((a) => (a[0] == x && a[1] == y)).length < 1)
                {
                    x = (x * 2) + this.neighborhoods[i][0];
                    y = (y * 2) + this.neighborhoods[i][1];
                    this.homes.push([x, y])
                    //console.log([x, y])
                }
            }
        }
    }

    getHouses()
    {
        return this.homes;
    }

    
    /*populateCells()
    {
        for (let i = 0; i < population_size; i++)
        {

        }
    }
*/
}