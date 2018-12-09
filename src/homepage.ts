/**
 * Sets the number of persons surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getNumPersons(sqlResults) {
    console.log(sqlResults)
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumPersons");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of unique stickers surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getNumStickers(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumStickers");
    headingElement.innerHTML = sqlResults.numRecords.count;

}

/**
 * Sets the number of uniuqe hometowns surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getNumHometowns(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumHometowns");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of majors surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getMajors(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumMajors");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of brands surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getBrands(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumBrands");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of laptops surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getLaptops(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myNumLaptop");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of persons surveyed on homepage with stickers on their laptops
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getPeopleHadStickers(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("myPeopleHadStickers");
    headingElement.innerHTML = sqlResults.numRecords.count;
}

/**
 * Sets the number of average stickers on a laptop on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getAvgStickers(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("avgStickers");
    headingElement.innerHTML = sqlResults.totalavg;
}


/**
 * Sets the average area of stickers surveyed on homepage
 * @param sqlResults The parsed object resulting from the SQL Query
 */
function getAvgSize(sqlResults) {
    console.log(sqlResults);
    var headingElement = <HTMLHeadingElement> document.getElementById("avgSize");
    headingElement.innerHTML = sqlResults.avgSize.round + " sq in";
}
