function getNumPersons(sqlResults) {
    console.log(sqlResults)
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumPersons");
    headingElement.innerHTML = sqlResults.numRecords.count;
}
function getNumStickers(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumStickers");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

function getNumHometowns(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumHometowns");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

function getMajors(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumMajors");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

function getBrands(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumBrands");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

function getLaptops(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumLaptop");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

function getPeopleHadStickers(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myPeopleHadStickers");
    headingElement.innerHTML = sqlResults.numRecords.count;
}
 