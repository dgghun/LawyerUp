
/**\
 * Loads video connection - Retrieved from Vidyo.io tutorial 
 */
function onVidyoClientLoaded(status) {
    switch (status.state) {
        case "READY":

            // Create Vidyoconnector

        VC.CreateVidyoConnector({
            viewId: "renderer", //Assign the id of div to the value of the viewId property where camera will get rendered
            viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
            remoteParticipants: 2,
            logFileFilter: "warning info@VidyoClient info@VidyoConnector",
            logFileName: "",
            userData: ""
        }).then(function (vidyoConnector) {
            /*Handle appearance and disappearance of camera devices in the system*/
            vidyoConnector.RegisterLocalCameraEventListener({
            onAdded: function(localCamera) {},
            onRemoved: function(localCamera) {},
            onSelected: function(localCamera) {},
            onStateUpdated: function(localCamera, state) {}
        }).then(function() {
            console.log("RegisterLocalCameraEventListener Success");
        }).catch(function() {
            console.error("RegisterLocalCameraEventListener Failed");
        });

        /*Handle appearance and disappearance of microphone devices in the system*/
        vidyoConnector.RegisterLocalMicrophoneEventListener({
            onAdded: function(localMicrophone) {},
            onRemoved: function(localMicrophone) {},
            onSelected: function(localMicrophone) {},
            onStateUpdated: function(localMicrophone, state) {}
        }).then(function() {
            console.log("RegisterLocalMicrophoneEventListener Success");
        }).catch(function() {
            console.error("RegisterLocalMicrophoneEventListener Failed");
        });

        /*Handle appearance and disappearance of speaker devices in the system*/
        vidyoConnector.RegisterLocalSpeakerEventListener({
            onAdded: function(localSpeaker) {},
            onRemoved: function(localSpeaker) {},
            onSelected: function(localSpeaker) {},
            onStateUpdated: function(localSpeaker, state) {}
        }).then(function() {
            console.log("RegisterLocalSpeakerEventListener Success");
        }).catch(function() {
            console.error("RegisterLocalSpeakerEventListener Failed");
        });

        // Add Token and Connect To Conference
        vidyoConnector.Connect({
            host: "prod.vidyo.io",
            // token: 'cHJvdmlzaW9uAGRnZ2h1bkAyOTZhMTUudmlkeW8uaW8ANjM3MzE2NTY4NjcAADEyYmY2ZGJmOWI3Y2FiYWJjZTUxNDhiMmVhNzU5YmEzOTNkODAxOGQ3ZWI3NjcwM2MxNmVlMTgzZjc1NGZjMTQ2MzRkNWU0NDRiZjJiMjhiNzk1MDk4NTI2MGI5MGVmMw', //Generated Token
            token: TOKEN.trim(),
            // displayName: "dgghun", //User Name
            displayName: USER, //User Name
            // resourceId: "demoroom", //Conference Name
            resourceId: ROOM, //Conference Name
            onSuccess: function () {
                console.log("Sucessfully connected");
            },
            onFailure: function (reason) {
                console.log("Error while connecting ", reason);
            },
            onDisconnected: function (reason) {
                console.log("Disconnected ", reason);
            }
        }).then(function (status) {
        
        }).catch(function () {
        
        });
        });

            break;
        case "RETRYING":
            break;
        case "FAILED":
            break;
        case "FAILEDVERSION":
            break;
        case "NOTAVAILABLE":
            break;
    }
    return true;
}