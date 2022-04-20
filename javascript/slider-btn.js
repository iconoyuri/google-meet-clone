class SliderBtn {
    constructor() {
        this.leftBtn = document.querySelectorAll(
            ".wrapper .right .arrow-btn"
        )[0];
        this.rightBtn = document.querySelectorAll(
            ".wrapper .right .arrow-btn"
        )[1];
        this.contents = [
            {
                img: "https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg",
                heading: "Obtenir un lien de partage",
                paragraph:
                    "Cliquez sur <b>Nouvelle réunion</b> pour obtenir le lien à envoyer aux personnes que vous souhaitez inviter à une réunion",
            },
            {
                img: "https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg",
                heading: "Voir tout le monde",
                paragraph:
                    'Pour pouvoir afficher un plus grand nombre de personnes simultanément, accédez au menu "Autres options" et sélectionnez "Modifier la disposition"',
            },
            {
                img: "https://www.gstatic.com/meet/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg",
                heading: "Planifier et anticiper",
                paragraph:
                    "Cliquez sur <b>Nouvelle réunion</b> pour planifier des réunions dans Google Agenda et envoyer des invitations aux participants",
            },
            {
                img: "https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
                heading: "Votre réunion est sécurisée",
                paragraph:
                    "Personne ne peut rejoindre une réunion sans y avoir été invité ou admis par l'organisateur",
            },
        ];
        this.image = document.querySelector(".wrapper .right .image img");
        this.heading = document.querySelector(".wrapper .right .texts h2");
        this.paragraph = document.querySelector(".wrapper .right .texts p");
        this.steps = Array.from(
            document.querySelector(".wrapper .right .steps").children
        );
        this.counter = 0;
        this.setEvents();
    }
    setEvents() {
        this.leftBtn.addEventListener("click", this.previousSlide.bind(this));
        this.rightBtn.addEventListener("click", this.nextSlide.bind(this));
    }

    previousSlide() {
        this.counter--;
        this.modulateIndex();
        this.btnState();
    }

    nextSlide() {
        this.counter++;
        this.modulateIndex();
        this.btnState();
    }

    btnState() {
        if (this.counter == 0) this.leftBtn.classList.add("disabled");
        else this.leftBtn.classList.remove("disabled");
        if (this.counter == this.contents.length - 1)
            this.rightBtn.classList.add("disabled");
        else this.rightBtn.classList.remove("disabled");
    }

    modulateIndex() {
        if (this.counter == this.contents.length) this.counter--;
        if (this.counter == -1) this.counter++;
        this.counter %= this.contents.length;
        this.setContent();
    }

    setContent(index = this.counter) {
        this.image.src = this.contents[index].img;
        this.heading.innerHTML = this.contents[index].heading;
        this.paragraph.innerHTML = this.contents[index].paragraph;
        this.steps.forEach((step) => step.classList.remove("active"));
        this.steps[index].classList.add("active");
    }
}

new SliderBtn();
