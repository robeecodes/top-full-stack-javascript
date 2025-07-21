import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css';

// Components
import tabs from "./scripts/components/tabs";

// Pages
import home from "./scripts/pages/home.js";
import menu from "./scripts/pages/menu";
import about from "./scripts/pages/about";

// Utils
import emptyContent from "./scripts/utils/emptyContent";

const pages = [home, about, menu];
const container = document.querySelector('#content');

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        if (tab.getAttribute("aria-selected") === "true") return;
        tabs.forEach(tab => tab.setAttribute("aria-selected", "false"));

        emptyContent(container)
            .then(() => pages[index](container));

        tab.setAttribute("aria-selected", "true");
    });
});

pages[0](container);