class Person 
{
    constructor(home)
    {
        this.vaccinated = false;
        this.home_location = home;
        this.current_location = home;
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
}