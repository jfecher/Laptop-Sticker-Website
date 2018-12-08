function fillGallery(sqlResults) {
    var container = document.getElementById("myNumPersons");
    container.innerHTML = "";
    sqlResults.laptop_picture_urls.for_each( url => {
        container.innerHTML += "<img src='" + url + "' />";
    });
}
