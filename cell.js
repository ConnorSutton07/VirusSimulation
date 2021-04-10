class Cell 
{
    constructor()
    {
        this.populated = false;
        this.person = 0;
    }

    newPerson(house)
    {
        this.populated = true;
        this.person = new Person(house)
    }
}