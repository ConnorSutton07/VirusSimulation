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
            if (Math.random() > 0.8) {
                this.action = 'moving'
                return True
            }
            return False
        }
        else {
            if (Math.random > 0.8) {
                return True
            }
            else {
                this.action = 'idle';
                return False
            }
        }
    }

    getDestination(buildings) {
        let building = buildings[Math.floor(Math.random() * buildings.length)];
        BUILDING_WIDTH = 10; //this should reflect what is in render.js
        let x = building[0] + Math.floor(Math.random() * 10);
        let y = building[1] + Math.floor(Math.random() * 10);
        this.destination = [x,y];
    }

    update(people, houses, buildings) {
        if (this.current_location[0] == this.destination[0] && this.current_location[1] == this.destination[1]) {
            this.getDestination(buildings)
        }
        if (this.isMove()) {
            //move
        }
    }
}