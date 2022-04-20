class PopUpHandler {
    constructor(trigger, target, blur, callbackShow, callbackHide) {
        this.trigger = trigger;
        this.target = target;
        this.blur = blur;
        this.setEvents();
    }

    setEvents() {
        this.trigger.addEventListener("click", this.show.bind(this));
        document.body.addEventListener("click", this.bodyHide.bind(this));
    }
    show(e) {
        if (!this.target.contains(e.target))
            this.target.classList.toggle("visible");
    }
    bodyHide(e) {
        if (
            !(this.trigger.contains(e.target) || this.target.contains(e.target))
        )
            this.target.classList.remove("visible");
    }
}
