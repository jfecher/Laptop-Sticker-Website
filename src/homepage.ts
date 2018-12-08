var numPeople;
function addHome(sqlResults) {
    console.log(sqlResults)
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumPersons");
    headingElement.innerHTML = sqlResults.numPeople.count;
    

}