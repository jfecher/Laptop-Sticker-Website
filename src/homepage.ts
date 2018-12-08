var numPeople;
function addHome(sqlResults) {

    if (numPeople) {
        numPeople.destroy();
    }

    var headingElement = <HTMLHeadingElement> document.getElementById("myNumPersons");
    headingElement.innerHTML = sqlResults.numPeople;
    

}