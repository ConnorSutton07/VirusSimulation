class Person 
{
    constructor(home)
    {
        self.vaccinated = false;
        self.home_location = home;
        self.current_location = home;
        self.mask_wearer = (Math.random() < document.getElementById('rateMasks').value)
        self.infected = Math.random() < 0.10;
        self.action = 'idle';
    }

    getLocation()
    {
        return self.current_location;
    }

    getAction()
    {

    }
}