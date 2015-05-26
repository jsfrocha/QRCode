function readSuccess(data) {
    $('#read').html(data);
    console.log("Read Data: ", data);
    window.location.href = data;
}

function readError(err) {
    //Do something when read errors are detected
    //$('#read_error').html(err);
    //console.log("Read Error: ", err);
}

function videoLoadError(err) {
    //The video stream could not be loaded
    //$('#vid_error').html(err);
    //console.log("Video Error: ", err);
}


$(document).ready(function() {
    $('#reader').html5_qrcode(readSuccess, readError, videoLoadError);
});







