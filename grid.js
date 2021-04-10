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

            this.neighborhoods.push([x * 10, y * 10])
        }

        let house_width = 2;
        for (let i = 0; i < this.neighborhoods.length; i++)
        {
            for (let j = 0; j < (this.population_size / this.num_neighborhoods * this.house_size); j++)
            {
                let x = Math.floor(Math.random() * (neighborhood_width / house_width))
                let y = Math.floor(Math.random() * (neighborhood_width / house_width))

                
            }
        }


    }

    
    /*populateCells()
    {
        for (let i = 0; i < population_size; i++)
        {

        }
    }
*/
}