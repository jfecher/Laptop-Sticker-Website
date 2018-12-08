
/**
 * Take the given sqlQuery in the form {laptop_picture_urls: []}
 * and generate html to show each of the selected urls
 */
function fillGallery(sqlResults) {
    var container = document.getElementById("laptop_img_container");
    container.innerHTML = "";
    sqlResults.laptop_picture_urls.forEach( url => {
    container.innerHTML += `
        <div id='iframeWrapper' style='display: inline-block; position: relative'>
            <iframe style='z-index: 1' src='${url.replace('open?id=', 'file/d/')}/preview' width='240' height='320'></iframe>
            <div id='iframeBlocker' style='position: absolute; top: 0; left: 0; width: 95%; height: 95%; opacity: 0;'></div>
        </div>
    `;
    });
}


/** Helper to get the value of a dropdown */
function getInputElem(id) {
    let elem = <HTMLInputElement> document.getElementById(id);
    return elem.value;
}


/**
 * Refresh picture list with new pictures matching the
 * four dropdowns color, count, brand, gender
 */
function refreshStickers(){
    let color = getInputElem("sticker_color");
    let brand = getInputElem("laptop_brand");
    let gender = getInputElem("gender");
    simpleHttpRequest("/api/getStickerUrls/" + color + "/" + brand + "/" + gender, fillGallery, console.log);
}
