class Participant {
    constructor(name, videoStream, imgSrc, master) {
        this.mainContainer = document.createElement("div");
        this.videoElement = document.createElement("video");
        this.imageElement = document.createElement("img");
        this.nameElement = document.createElement("h5");
        this.microStatusElement = document.createElement("div");

        this.name = name
        this.videoStream = videoStream
        this.createDOMParticipant(name, this.videoStream, imgSrc, master);
        this.participantAdding();
        
        this.savePosition()
        
    }
    setVideoStream(stream) {
        this.videoElement.autoplay = true;
        this.videoElement.srcObject = videoStream;
        this.mainContainer.appendChild(this.videoElement);
    }
    createDOMParticipant(name, videoStream, imgSrc, master) {
        // Participant div creation
        this.mainContainer.classList.add("participant");
        this.mainContainer.classList.add("animate");
        if (master) this.mainContainer.classList.add("master");
        // Participant image container and image element creation and adding to the DOM
        this.imageElement.src = imgSrc;
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("img");
        imgDiv.appendChild(this.imageElement);
        this.mainContainer.appendChild(imgDiv);
        // Video source setting and video element setting and adding to the DOM
        if(videoStream)
            this.setVideoStream(videoStream)
        // Setting the participant's name and adding to the DOM
        this.nameElement.innerHTML = name;
        this.nameElement.classList.add("name");
        this.mainContainer.appendChild(this.nameElement);
        // Setting the microphone element and adding to the DOM
        this.microStatusElement.classList.add("micro-voice");
        let microOffIcon = document.createElement("i");
        microOffIcon.classList.add("fas");
        microOffIcon.classList.add("fa-play");
        this.microStatusElement.appendChild(microOffIcon);
        this.mainContainer.appendChild(this.microStatusElement);

        // Computing height
    }
    savePosition() {
        // console.log(this)
        this.offsetLeft = this.mainContainer.offsetLeft;
        this.offsetTop = this.mainContainer.offsetTop;
    }
    participantAdding() {
        document
            .querySelector(".participants-pane")
            .appendChild(this.mainContainer);        
    }
    easeReplace() {
        // After replacing, we fetch the new position of the maincontainer
        let newOffsetLeft = this.mainContainer.offsetLeft
        let newOffsetTop = this.mainContainer.offsetTop
        // Placing the maincontainer to his initial position (before the other participant adding)
        this.mainContainer.style.setProperty("left", (-newOffsetLeft + this.offsetLeft) + "px")
        this.mainContainer.style.setProperty("top", (-newOffsetTop + this.offsetTop) + "px")

        // Adding a transition property to make sure the position changing will happen progressivly
        this.mainContainer.style.transition =
            "width .5s, transform .5s, top .5s, left .5s";
        // The setTimeout is for that the transition property could effectively apply before the repositionning
        setTimeout(function () {
            // Then the container is placed the position wich is now its (the default position after a new participant adding)
            this.mainContainer.style.setProperty(
                "left",
                0 + "px"
            );
            this.mainContainer.style.setProperty(
                "top",
                0 + "px"
            );
        }.bind(this), 0) 
    }
}

class ParticipantsPaneHandler {
    constructor() {
        this.paneElement = document.querySelector(".participants-pane");
        this.participantsList = [];
        this.setEvents();
    }
    setEvents() {
        this.paneElement.addEventListener(
            "DOMNodeInserted",
            function (e) {
                setTimeout(() => {
                    e.target.classList.remove("animate");
                }, 10);
                this.computeParticipantsWidth(e);
                this.replaceParticipants(e)
            }.bind(this)
        );
    }
    addParticipant(participant) {
        this.participantsList.push(participant)
    }
    computeParticipantsWidth(e) {
        let childNumber = this.paneElement.childElementCount;
        let basis = 60;

        if (childNumber <= 2) {
            this.paneElement.style.setProperty(
                "--participant-min-width",
                basis / 2 + "rem"
            );
            if (childNumber == 2)
                this.paneElement.style.setProperty(
                    "--participant-width",
                    "calc(" + 100 / 2 + "% - " + 1 + " * var(--gap))"
                );
        } else if (childNumber <= 6) {
            this.paneElement.style.setProperty(
                "--participant-min-width",
                basis / 3 + "rem"
            );
            this.paneElement.style.setProperty(
                "--participant-width",
                "calc(" + 100 / 3 + "% - " + 2 + " * var(--gap))"
            );
        } else {
            this.paneElement.style.setProperty(
                "--participant-min-width",
                basis / 4 + "rem"
            );
            this.paneElement.style.setProperty(
                "--participant-width",
                "calc(" + 100 / 4 + "% - " + 3 + " * var(--gap))"
            );
        }
    }
    replaceParticipants(e) {
        this.participantsList.forEach(participant => {
            participant.easeReplace();
        })
    }
}
