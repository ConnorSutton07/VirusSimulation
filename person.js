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

    getAction()
    {

    }

    isMove() {
        if (this.action == 'idle') {
            if (Math.random() > 0.99) {
                this.action = 'moving'
                return true
            }
            return false
        }
        else {
            //if (Math.random > 0.99) {
                //this.action = 'idle';
                //return false
            //}
            //else {
            return true
            //}
        }
    }

    getDestination(buildings) {
        if (!(this.current_location[0] == this.home_location[0] && this.current_location[1] == this.home_location[1])) { // if not at home
            this.action = 'idle'
            if (Math.random() > 0.4) {
                return [this.home_location[0], this.home_location[1]]
            }
        }
        else {
            this.action = 'idle'
        }
        let building = buildings[Math.floor(Math.random() * buildings.length)];
        let BUILDING_WIDTH = 10; //this should reflect what is in render.js
        let x = building[0] + Math.floor(Math.random() * BUILDING_WIDTH);
        let y = building[1] + Math.floor(Math.random() * BUILDING_WIDTH);
        return [x,y];

    }

    update(people, houses, buildings) {
        if (this.current_location[0] == this.destination[0] && this.current_location[1] == this.destination[1]) {
            this.destination = this.getDestination(buildings)
        }
        if (this.isMove()) {
            //Currently allows for movement through buildings 
            let new_x = this.current_location[0]
            let new_y = this.current_location[1]
            if (this.current_location[0] != this.destination[0]) {
                new_x = this.current_location[0] + (this.destination[0] - this.current_location[0]) / Math.abs(this.destination[0] - this.current_location[0])
            }
            if (this.current_location[1] != this.destination[1]) {
                new_y = this.current_location[1] + (this.destination[1] - this.current_location[1]) / Math.abs(this.destination[1] - this.current_location[1])
            }   
            if (new_x != this.current_location[0] || new_y != this.current_location[1]) {
                if (people[new_x][this.current_location[1]] == 0) {
                    //console.log(this.current_location[0], this.current_location[1])
                    people[new_x][this.current_location[1]] = this;
                    people[this.current_location[0]][this.current_location[1]] = 0;
                    this.current_location = [new_x, this.current_location[1]];
                }
                else if (people[this.current_location[0]][new_y] == 0) {
                    people[this.current_location[0]][new_y] = this;
                    people[this.current_location[0]][this.current_location[1]] = 0;
                    this.current_location = [this.current_location[0], new_y];
                }
            } 
        }
    }
}