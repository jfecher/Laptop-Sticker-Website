function fillGallery(sqlResults) {
    var container = document.getElementById("laptop_img_container");
    container.innerHTML = "";
    sqlResults.laptop_picture_urls.forEach( url => {
        container.innerHTML += "<iframe src='" + url.replace('open?id=', 'file/d/') + "/preview' width='480' height='640'></iframe>";

    });
}
