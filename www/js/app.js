// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//     console.log("Device is ready!");

//     // Set up media file and global variables
//     var myMedia = null;
//     var src = "myrecording.wav"; // Audio file name
//     var isRecording = false;

//     // DOM elements for buttons
//     var recordButton = document.getElementById('recordAudio');
//     var playButton = document.getElementById('playAudio');
//     var stopButton = document.getElementById('stopAudio');
//     var statusElement = document.getElementById('status');

//     // Request microphone permission
//     checkMicrophonePermission();

//     // Event listener to record audio
//     recordButton.addEventListener('click', function () {
//         if (!isRecording) {
//             myMedia = new Media(src,
//                 // Success callback
//                 function () {
//                     console.log("Recording audio success");
//                 },
//                 // Error callback
//                 function (err) {
//                     console.log("Recording audio error: " + err.code);
//                 }
//             );
//             myMedia.startRecord();
//             isRecording = true;
//             updateStatus("Recording audio...");
//         } else {
//             updateStatus("Already recording.");
//         }
//     });

//     // Event listener to play recorded audio
//     playButton.addEventListener('click', function () {
//         if (myMedia && !isRecording) {
//             myMedia.play();
//             updateStatus("Playing audio...");
//         } else {
//             updateStatus("No recording found or still recording.");
//         }
//     });

//     // Event listener to stop recording or playback
//     stopButton.addEventListener('click', function () {
//         if (myMedia) {
//             if (isRecording) {
//                 myMedia.stopRecord();
//                 isRecording = false;
//                 updateStatus("Recording stopped.");
//             } else {
//                 myMedia.stop();
//                 updateStatus("Playback stopped.");
//             }
//         }
//     });

//     // Function to update the status text
//     function updateStatus(message) {
//         statusElement.innerHTML = message;
//     }

//     // Function to check and request microphone permission
//     function checkMicrophonePermission() {
//         cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status) {
//             if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
//                 console.log("Microphone permission granted");
//                 updateStatus("Microphone permission granted");
//             } else {
//                 console.log("Microphone permission denied");
//                 updateStatus("Microphone permission denied. Cannot record.");
//             }
//         }, function(error) {
//             console.error("The following error occurred: " + error);
//         });
//     }
// }


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device is ready!");

    // Set up global variables
    var myMedia = null;
    var src = cordova.file.externalDataDirectory + "myrecording.wav"; // Audio file path
    var isRecording = false;

    // DOM elements for buttons
    var recordButton = document.getElementById('recordAudio');
    var playButton = document.getElementById('playAudio');
    var stopButton = document.getElementById('stopAudio');
    var statusElement = document.getElementById('status');

    // Request necessary permissions (Microphone, External Storage)
    checkPermissions();

    // Event listener to record audio
    recordButton.addEventListener('click', function () {
        if (!isRecording) {
            myMedia = new Media(src,
                // Success callback
                function () {
                    console.log("Recording audio success");
                    updateStatus("Recording finished successfully.");
                },
                // Error callback
                function (err) {
                    console.log("Recording audio error: " + err.code);
                    updateStatus("Recording audio error: " + err.code);
                }
            );
            myMedia.startRecord();
            isRecording = true;
            updateStatus("Recording audio...");
        } else {
            updateStatus("Already recording.");
        }
    });

    // Event listener to play recorded audio
    playButton.addEventListener('click', function () {
        if (myMedia && !isRecording) {
            myMedia.play();
            updateStatus("Playing audio...");
        } else {
            updateStatus("No recording found or still recording.");
        }
    });

    // Event listener to stop recording or playback
    stopButton.addEventListener('click', function () {
        if (myMedia) {
            if (isRecording) {
                myMedia.stopRecord();
                isRecording = false;
                updateStatus("Recording stopped.");
            } else {
                myMedia.stop();
                updateStatus("Playback stopped.");
            }
        }
    });

    // Function to update the status text
    function updateStatus(message) {
        statusElement.innerHTML = message;
    }

    // Function to check and request necessary permissions
    function checkPermissions() {
        var permissions = cordova.plugins.permissions;
        var permissionList = [
            permissions.RECORD_AUDIO,
            permissions.WRITE_EXTERNAL_STORAGE,
            permissions.READ_EXTERNAL_STORAGE
        ];

        permissions.requestPermissions(
            permissionList,
            function(status) {
                if (status.hasPermission) {
                    console.log("All permissions granted.");
                    updateStatus("All permissions granted.");
                } else {
                    console.error("Permissions denied.");
                    updateStatus("Permissions denied. Cannot record audio.");
                }
            },
            function(error) {
                console.error("Permission request error: " + error);
                updateStatus("Permission request error: " + error);
            }
        );
    }
}
