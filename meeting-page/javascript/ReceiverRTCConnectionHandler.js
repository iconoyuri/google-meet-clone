class ReceiverRTCConnectionHandler extends RTCConnectionHandler {
    constructor() {
        super();
        // this.joinCall();
    }
    handleSignallingData(data) {
        switch (data.type) {
            case "offer":
                peerConn.setRemoteDescription(data.offer);
                this.createAndSendAnswer();
                break;
            case "candidate":
                peerConn.addIceCandidate(data.candidate);
        }
    }
    setPeerConnectionObject() {
        super.setPeerConnectionObject();
        this.sendData({
            type: "join_call",
        });
        // this.createAndSendOffer();
    }
    iceCandidateEventBehavior(e) {
        if (e.candidate == null) return;
        this.sendData({
            type: "send_candidate",
            candidate: e.candidate,
        });
    }
    createAndSendAnswer() {
        this.peerConn.createAnswer(
            function (answer) {
                this.peerConn.setLocalDescription(answer);
                this.sendData({
                    type: "send_answer",
                    answer: answer,
                });
            }.bind(this),
            (error) => {
                console.log(error);
            }
        );
    }
}
