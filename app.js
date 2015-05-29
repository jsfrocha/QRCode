(function(window) {
    'use strict';
    var decoder = $('#qr-canvas'),
        sl = $('.scanner-laser');
    sl.css('opacity', .5);

    function gotSources(sourceInfos) {
        var nrSources = 0;
        for (var i = 0; i !== sourceInfos.length; ++i) {
            if (sourceInfos[i].kind === 'video')
                nrSources++;
        }
        var videoOptions = [];
        for (var i = 0; i !== sourceInfos.length; ++i) {
            if (nrSources === 1) break;
            var sourceInfo = sourceInfos[i];
            if (sourceInfo.kind === 'video') {
                $(videoSelect).css('display', 'inline-block');
                var option = document.createElement('option');
                option.value = sourceInfo.id;
                option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
                videoOptions.push(option);
                console.log(videoOptions);
                videoSelect.appendChild(option);
            }
        }
    }
    if (typeof MediaStreamTrack.getSources !== 'undefined') {
        var videoSelect = document.querySelector('select#cameraId');
        $(videoSelect).change(function(event) {
            if (typeof decoder.data().plugin_WebCodeCam !== "undefined") {
                decoder.data().plugin_WebCodeCam.options.videoSource.id = $(this).val();
                decoder.data().plugin_WebCodeCam.cameraStop();
                decoder.data().plugin_WebCodeCam.cameraPlay(false);
            }
        });
        MediaStreamTrack.getSources(gotSources);
    } else {
        document.querySelector('select#cameraId').remove();
    }
}).call(window.Page = window.Page || {});

$('#qr-canvas').WebCodeCam({
    ReadQRCode: true, // false or true
    ReadBarecode: true, // false or true
    width: 320,
    height: 240,
    videoSource: {
        id: true,      //default Videosource
        maxWidth: 640, //max Videosource resolution width
        maxHeight: 480 //max Videosource resolution height
    },
    flipVertical: false,  // false or true
    flipHorizontal: false,  // false or true
    zoom: -1, // if zoom = -1, auto zoom for optimal resolution else int
    beep: "js/beep.mp3", // string, audio file location
    autoBrightnessValue: false, // functional when value autoBrightnessValue is int
    brightness: 0, // int
    grayScale: false, // false or true
    contrast: 0, // int
    threshold: 0, // int
    sharpness: [], //or matrix, example for sharpness ->  [0, -1, 0, -1, 5, -1, 0, -1, 0]
    resultFunction: function(resText, lastImageSrc) {
        console.log(resText);
        window.location.href = resText;
    },
    getUserMediaError: function() {
/*        callback funtion to getUserMediaError
        example:
            alert('Sorry, the browser you are using doesn\'t support getUserMedia');*/

    },
    cameraError: function(error) {
        /* callback funtion to cameraError,
         example:
         var p, message = 'Error detected with the following parameters:\n';
         for (p in error) {
         message += p + ': ' + error[p] + '\n';
         }
         alert(message);
         */
    }
});

$(document).ready(function() {
   console.log($('#cameraId option').size());
});