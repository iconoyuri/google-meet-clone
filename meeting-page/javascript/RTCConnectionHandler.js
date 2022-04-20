
class RTCConnectionHandler{
    constructor(master) {
        this.master = master
        this.webSocket = new WebSocket("")
        this.username = this.master.name
        this.localStream = this.master.videoStream
        this.peerConn = null
        this.peerConnConfig = {
            iceServers: [
                {
                    urls: [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                    ],
                },
            ],
        };
        this.webSocket.onmessage = function(event) {
            this.handleSignallingData(JSON.parse(event.data))
        }.bind(this)
        this.setLocalStream()

    }
    sendData(data) {
        data.username = this.username
        this.webSocket.send(JSON.stringify(data))
    }
    handleSignallingData(data){}
    
    setLocalStream() {
        navigator.getUserMedia(
            {
                video: {
                    frameRate: 24,
                    aspectRatio: 1.33333,
                },
                audio: true,
            },
            (stream) => {
                this.localStream = stream;
                // Add the line that permit to link the stream with the DOM video element 
                // of this participant
                document.querySelector(".participant.master video").srcObject = this.localStream
                this.setPeerConnectionObject()
            },
            (error) => {
                console.log(error);
            }
        );
    }
    // This function in the tutorial is attached to the send name HTML  button
    sendUserName() {
        // this.username = "Master"
        this.sendData({type: "store_user"})
    }
    setPeerConnectionObject() {
        this.peerConn = new RTCConnectionHandler(this.peerConnConfig);
        this.peerConn.addStream(this.localStream)

        this.peerConn.onaddstream = (e) => {
            // document.querySelector.srcObject = e.stream;
            // I hope that it is this instruction upper that was at the origin of a participant adding
            participantsPaneHandler.addParticipant(new Participant("")) 

        };

        this.peerConn.onicecandidate = this.iceCandidateEventBehavior.bind(this);
    }
    iceCandidateEventBehavior(){}
}
