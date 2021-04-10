class Person 
{
    constructor(home)
    {
        this.vaccinated = false;
        this.home_location = home;
        this.current_location = home;
        this.destination = home;
        this.mask_wearer = (Math.random() < ((document.getElementById('rateMasks').value) / 100))
        this.infected = Math.random() < 0.05;
        this.been_infected = this.infected
        this.time_infected = 0
        this.action = 'idle';
        this.updated = false;
        this.dead = false;
    }

    getLocation()
    {
        return this.current_location;
    }

    isMove() {
        if (this.action == 'idle') {
            if (Math.random() > 0.99) {
                this.action = 'moving'
                return true
            }
            return false
        }
        return true;
    }

    getDestination(buildings) {
        this.action = 'idle';
        if (!(this.current_location[0] == this.home_location[0] && this.current_location[1] == this.home_location[1])) { // if not at home
            if (Math.random() > 0.25) {
                return [this.home_location[0], this.home_location[1]]
            }
        }
        let building = buildings[Math.floor(Math.random() * buildings.length)];
        let BUILDING_WIDTH = 10; //this should reflect what is in render.js
        let x = building[0] + Math.floor(Math.random() * BUILDING_WIDTH);
        let y = building[1] + Math.floor(Math.random() * BUILDING_WIDTH);
        return [x,y];

    }

    update(people, houses, buildings) {
        this.updated = true;
        let pos = [this.current_location[0], this.current_location[1]]
        if (pos[0] == this.destination[0] && pos[1] == this.destination[1]) {
            this.destination = this.getDestination(buildings)
            return;
        }
        if (!this.dead) {
            if (this.isMove()) {
                //Currently allows for movement through buildings 
                let new_x = pos[0];
                let new_y = pos[1];

                //console.log("Current: ", pos[0], pos[1])

                if (pos[0] != this.destination[0]) 
                    new_x = pos[0] + ((this.destination[0] - pos[0]) / Math.abs(this.destination[0] - pos[0]))
                
                if (pos[1] != this.destination[1]) 
                    new_y = pos[1] + ((this.destination[1] - pos[1]) / Math.abs(this.destination[1] - pos[1]))

                if (people[new_x][new_y] == 0)
                {
                    people[new_x][new_y] = this;
                    people[pos[0]][pos[1]] = 0;
                    this.current_location = [new_x, new_y]    
                }
                else
                {
                    this.randomMove(pos, people);
                }    

            }
            if (this.time_infected == 200) {
                this.been_infected = true
                this.infected = false
            }

            if (this.infected) {
                this.infect(people, houses, buildings) 
                this.death()
                this.time_infected += 1
            }
            else {
                this.time_infected = 0
            }
        }
    }
    death() {
        if (Math.random > 0.99) {
            this.dead = true
        }
    }

    infect(people, houses, buildings) {
        let pos = [this.current_location[0], this.current_location[1]];
        for (let i = -1; i < 2; i ++) {
            for (let j = -1; j < 2; j ++) {
                if (pos[0] + i < 98 && pos[0] + i > 1 && pos[1] + j < 98 && pos[1] + j > 1)
                {
                    let neighbor = people[pos[0] + i][pos[1] + j]
                    if (neighbor != 0) {
                        if (!neighbor.been_infected && !neighbor.infected) {
                            let infection_chance = 0.1 - (0.095 * this.mask_wearer) - (0.004 * neighbor.mask_wearer);
                            if (infection_chance > Math.random())
                                neighbor.infected = true
                        }
                    }
                }
            }
        }
    }


    randomMove(pos, people)
    {
        let attempts = 0;
        let moved = false;
        while (attempts < 10 && !moved)
        {
            let i = Math.max(Math.min((pos[0] + (Math.floor(Math.random() * 3) - 1)), 99), 0);
            let j = Math.max(Math.min((pos[1] + (Math.floor(Math.random() * 3) - 1)), 99), 0);

            if (people[i][j] == 0)
            {
                people[i][j] = this;
                people[pos[0]][pos[1]] = 0;
                this.current_location = [i, j];
                moved = true;
            }
            attempts++;
        }
        /*
        for (let i = pos[0] - 1; i <= pos[0] + 1; i++)
        {
            for (let j = pos[1] - 1; j <= pos[1] + 1; j++)
            {
                i = Math.max(Math.min(i, 99), 0);
                j = Math.max(Math.min(j, 99), 0);
                if (!(i == pos[0] && j == pos[1]))
                {
                    if (people[i][j] == 0)
                    {
                        people[i][j] = this;
                        people[pos[0]][pos[1]] = 0;
                        this.current_location = [i, j];
                        return;
                    }
                }
            }
        }
        */
    }

    clearUpdate()
    {
        this.updated = false;
    }

    hasUpdated()
    {
        return this.updated;
    }
}