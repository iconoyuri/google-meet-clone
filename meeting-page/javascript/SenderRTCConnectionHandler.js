class SenderRTCConnectionHandler extends RTCConnectionHandler {
    constructor() {
        super();
        // this.startCall();
    }
    // startCall() {
    //     ////////////////
    //     // Instructions to display de sender's stream
    //     ///////////////
    //     // this.setLocalStream();
    // }
    handleSignallingData(data) {
        switch (data.type) {
            case "answer":
                peerConn.setRemoteDescription(data.answer);
                break;
            case "candidate":
                peerConn.addIceCandidate(data.candidate);
        }
    }
    setPeerConnectionObject() {
        super.setPeerConnectionObject();
        this.createAndSendOffer();
    }

    iceCandidateEventBehavior(e) {
        if (e.candidate == null) return;
        this.sendData({
            type: "store_candidate",
            candidate: e.candidate,
        });
    }
    createAndSendOffer() {
        this.peerConn.createOffer(
            (offer) => {
                this.sendData({
                    type: "store_offer",
                    offer: offer,
                });

                peerConn.setLocalDescription(offer);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
