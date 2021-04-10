class Person 
{
    constructor(home)
    {
        this.vaccinated = false;
        this.home_location = home;
        this.current_location = home;
        this.destination = home;
        this.mask_wearer = (Math.random() < document.getElementById('rateMasks').value)
        this.infected = Math.random() < 0.10;
        this.action = 'idle';
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
        let pos = [this.current_location[0], this.current_location[1]]
        if (pos[0] == this.destination[0] && pos[1] == this.destination[1]) {
            this.destination = this.getDestination(buildings)
            return;
        }

        if (this.isMove()) {
            //Currently allows for movement through buildings 
            let new_x = pos[0];
            let new_y = pos[1];

            if (pos[0] != this.destination[0]) 
                new_x = pos[0] + ((this.destination[0] - pos[0]) / Math.abs(this.destination[0] - pos[0]))
            
            if (pos[1] != this.destination[1]) 
                new_y = pos[1] + ((this.destination[1] - pos[1]) / Math.abs(this.destination[1] - pos[1]))
            
            people[new_x][new_y] = this;
            people[pos[0]][pos[1]] = 0;
            this.current_location = [new_x, new_y]
        
        }
    }
}