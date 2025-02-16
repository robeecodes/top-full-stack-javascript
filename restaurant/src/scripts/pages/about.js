import aboutImage from '../../assets/img/macaroons.avif';
import fadeInHandler from "../utils/fadeInHandler";

const aboutSection = (() => {
    const content = document.createElement("section");
    content.id = "about";

    // Postcard
    const card = document.createElement("div");
    card.className = "fade-out";
    content.append(card);

    // Decorative image
    card.appendChild(
        Object.assign(document.createElement("img"), {
            src: aboutImage,
        })
    );

    // About text
    const aboutText = document.createElement("article");
    card.append(aboutText);

    aboutText.appendChild(
        Object.assign(document.createElement("h1"), {
            innerHTML: `Tea Served with Sincerity`,
        })
    );

    aboutText.appendChild(
        Object.assign(document.createElement("p"), {
            innerHTML: `<em>Seriously Tea</em> is the number one spot for true tea fanatics to chill out, hang out and sip on some premium teas from across the world.`,
        })
    );

    aboutText.appendChild(
        Object.assign(document.createElement("p"), {
            innerHTML: `<strong>Reservations not required!</strong> Feel free to come on down and see what's on offer. We also offer a take-out service if our restaurant is too full.`,
        })
    );

    return { content };
})();

export default function about(container) {
    fadeInHandler(aboutSection.content, container);
}