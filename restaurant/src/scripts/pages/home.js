import heroImage from '../../assets/img/hero.avif';
import fadeInHandler from "../utils/fadeInHandler";
import about from "./about";
import emptyContent from "../utils/emptyContent";
import tabs from "../components/tabs";

const hero = (() => {
    const content = document.createElement("section");
    content.id = "hero";

    // Hero image
    content.appendChild(
        Object.assign(document.createElement("img"), {
            src: heroImage,
            className: "fade-out",
        })
    );

    // Text Content
    content.appendChild(
        Object.assign(document.createElement("h1"), {
            innerHTML: `Seriously<br><span>Relaxing Teatimes</span>`,
            className: "fade-out",
        })
    );

    content.appendChild(
        Object.assign(document.createElement("p"), {
            innerHTML: `Authentic specialty teas <strong>brewed right</strong>`,
            className: "fade-out",
        })
    );

    // Hero Buttons
    const buttons = document.createElement('div');
    buttons.id = "buttons";
    buttons.className = "row";
    buttons.classList.add("fade-out");

    buttons.appendChild(
        Object.assign(document.createElement("button"), {
            innerText: `Find out more →`,
        })
    );

    buttons.appendChild(
        Object.assign(document.createElement("button"), {
            innerHTML: `<i class="fa-solid fa-envelope"></i>Contact`
        })
    ).setAttribute("data-state", "alternate");

    content.appendChild(buttons);

    return {content, aboutButton: buttons.children[0], contactButton: buttons.children[1]};
})();

export default function home(container) {
    fadeInHandler(hero.content, container);

    hero.aboutButton.removeEventListener("click", handleAboutClick);
    hero.aboutButton.addEventListener("click", handleAboutClick);

    function handleAboutClick() {
        const homeTab = tabs[0];
        const aboutTab = tabs[1];

        if (aboutTab.getAttribute("aria-selected") === "true") return;

        homeTab.setAttribute("aria-selected", "false");
        aboutTab.setAttribute("aria-selected", "true");

        emptyContent(container)
            .then(() => about(container));
    }
}