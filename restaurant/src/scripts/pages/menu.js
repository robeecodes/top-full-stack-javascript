import menuImage from '../../assets/img/menu.avif';
import fadeInHandler from "../utils/fadeInHandler";

const menuSection = (() => {
    const content = document.createElement("section");
    content.id = "menu";

    content.appendChild(
        Object.assign(document.createElement("h1"), {
            innerText: "Menu",
            className: "fade-out",
        })
    );

    // Left column photo
    const photoContainer = document.createElement("div");
    photoContainer.className = "fade-out";
    content.append(photoContainer);

    photoContainer.appendChild(
        Object.assign(document.createElement("img"), {
            src: menuImage,
        })
    );

    // Right column menu
    const menu = document.createElement("article");
    menu.className = "fade-out";
    content.append(menu);

    menu.appendChild(
        Object.assign(document.createElement("h2"), {
            innerText: "Black Teas",
        })
    );

    const blackTeas = document.createElement("ul");
    menu.appendChild(blackTeas);

    blackTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Assam Tea",
        })
    );
    blackTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Masala Chai Tea",
        })
    );
    blackTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Pu-erh Tea",
        })
    );

    menu.appendChild(
        Object.assign(document.createElement("h2"), {
            innerText: "Green Teas",
        })
    );

    const greenTeas = document.createElement("ul");
    menu.appendChild(greenTeas);

    greenTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Jasmine Green Tea",
        })
    );
    greenTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Matcha Green Tea",
        })
    );
    greenTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Sencha Green Tea",
        })
    );

    menu.appendChild(
        Object.assign(document.createElement("h2"), {
            innerText: "Herbal Teas",
        })
    );
    const herbalTeas = document.createElement("ul");
    menu.appendChild(herbalTeas);

    herbalTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Chamomile Tea",
        })
    );
    herbalTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Eucalyptus Tea",
        })
    );
    herbalTeas.appendChild(
        Object.assign(document.createElement("li"), {
            innerText: "Ginger Tea",
        })
    );

    return { content };
})();

export default function menu(container) {
    fadeInHandler(menuSection.content, container);
}