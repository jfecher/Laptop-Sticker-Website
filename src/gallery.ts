function fillGallery(sqlResults) {
    var container = document.getElementById("laptop_img_container");
    container.innerHTML = "";
    sqlResults.laptop_picture_urls.forEach( url => {
        container.innerHTML += "<img src='" + url + "/preview' />";
    });
}
