function fillGallery(sqlResults) {
    var container = document.getElementById("laptop_img_container");
    container.innerHTML = "";
    sqlResults.laptop_picture_urls.forEach( url => {
    container.innerHTML += `
        <div id='iframeWrapper' style='position: relative'>
            <iframe style='z-index: 1' src='" + url.replace('open?id=', 'file/d/') + "/preview' width='480' height='640'></iframe>
            <div id='iframeBlocker' style='position: absolute; top: 0; left: 0; width: 95%; height: 95%; opacity: 0;'></div>
        </div>
    `;
    });
}
