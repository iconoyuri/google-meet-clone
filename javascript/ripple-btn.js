document.querySelectorAll(".rippler").forEach((btn) => {
    btn.addEventListener("click", function () {
        this.style.setProperty("--btn-ripple-animation", "btn-ripple");
        setTimeout(
            function () {
                this.style.setProperty("--btn-ripple-animation", "empty-value");
            }.bind(this), 200
        );
    });
});
