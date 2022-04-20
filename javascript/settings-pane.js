class SettingsPaneHandler {
    constructor() {
        this.settingsPane = document.querySelector(".settings-pane");
        this.labels = this.settingsPane.querySelector(".setting-labels")
        this.panes = this.settingsPane.querySelector(".right .panes")
        this.closeBtn = this.settingsPane.querySelector(".close-btn")
        this.openBtn = document.querySelector("header .options .parameters-pane-btn")
        this.deviceLineList = this.settingsPane.querySelectorAll(".line-list")
        this.setLabelsPaneID()
        this.setEvents()
    }
    setEvents() {
        this.labels.addEventListener("click", function (e) {
            let label = e.target.closest(".setting-label");
            if (label) {
                this.resetLabels()
                this.resetPanes()
                label.classList.add("active")
                this.panes.children[label.dataset.labelID].classList.add("active")
            }
        }.bind(this))
        this.settingsPane.parentElement.addEventListener("click", function (e) {
            if (e.target === this.settingsPane.parentElement)
                this.hidePane()
        }.bind(this))
        this.closeBtn.addEventListener("click", this.hidePane.bind(this))
        this.openBtn.addEventListener("click", this.showPane.bind(this));
        this.deviceLineList.forEach(function (lineList) {
            lineList.addEventListener("click", function (e) {
                e.target.closest(".device-options").querySelector(".default").innerHTML = e.target.closest(".line").querySelector("p").innerHTML
                this.closest(".pop-up").classList.toggle("visible")
            })
        }.bind(this))
        
    }
    hidePane() {
        this.settingsPane.parentElement.classList.add("hidden")
    }
    showPane() {
        this.settingsPane.parentElement.classList.remove("hidden")
    }
    setLabelsPaneID() {
        let i = 0;
        Array.from(this.labels.children).forEach(label => label.dataset.labelID = i++)
    }
    resetLabels() {
        Array.from(this.labels.children).forEach(label => label.classList.remove("active"))
    }
    resetPanes() {
        Array.from(this.panes.children).forEach(pane => pane.classList.remove("active"))
    }
}
new SettingsPaneHandler()