var numPeople;
function addHome(sqlResults) {
    var results = JSON.parse(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumPersons");
    headingElement.innerHTML = results.numPeople;
    

}