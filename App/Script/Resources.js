/*
 * Created by Nick on 2015-08-19.
 */

var fileResource = function(url, mime) {
    this.url = url;
    this.mime = mime;
    this.type = 'localRes';
}

if (typeof __xaf_resources == "undefined") {
    var __xaf_resources = (function () {
        var files = {};
        //files["Resource name as per DB"] = new fileResource("src for use out of platform", "mime type" );
        files["RTS_Small"] = new fileResource("./Resources/Images/RTS_Small.png", "img/png");
        files["message_html"] = new fileResource("./Resources/message.html", "text/html");
        files["modal_html"] = new fileResource("./Resources/modalpopup.html", "text/html");
        files["modalpopupwithangularcallbacks"]= new fileResource("./Resources/modalpopupwithangularcallbacks.html", "text/html");
        return files;
    })();
}
