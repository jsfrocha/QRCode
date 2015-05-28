'use strict';

var videoElement;
var videoSelect = document.querySelector('select#videoSource');
var videoId = 0;
var videoPlaceholder;
var contentElement = $('#main-content');


navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
    for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audio') {

        } else if (sourceInfo.kind === 'video') {
            videoId = sourceInfo.id;
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
            videoPlaceholder = $('<div id="reader-'+videoId+'" class="qr-code-placeholder" style="width:300px;height:250px"></div>');
            videoPlaceholder.appendTo(contentElement);
        } else {
            console.log('Some other kind of source: ', sourceInfo);
        }
    }
}

if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
    MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {

    $('.qr-code-placeholder').html5_qrcode(function(data){
            alert(data);
        },
        function(error){
            //show read errors
        }, function(videoError){
            //the video stream could be opened
        }
    );

    videoElement = $('reader-'+videoId+' > video')[0];
    window.stream = stream; // make stream available to console
    videoElement.src = window.URL.createObjectURL(stream);
    videoElement.play();

}

function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
}

function start() {
    if (!!window.stream) {
        videoElement.src = null;
        window.stream.stop();
        videoPlaceholder.html5_qrcode_stop();
    }


    var videoSource = videoSelect.value;
    var constraints = {
        video: {
            optional: [{
                sourceId: videoSource
            }]
        }
    };
    navigator.getUserMedia(constraints, successCallback, errorCallback);
}

//videoSelect.onchange = start

start();

