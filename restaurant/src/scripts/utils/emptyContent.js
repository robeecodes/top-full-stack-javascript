const waitForTransitionEnd = (element) => {
    return new Promise((resolve) => {
        const handleTransitionEnd = (e) => {
            if (e.propertyName === "opacity") {
                element.removeEventListener("transitionend", handleTransitionEnd);
                resolve();
            }
        };

        element.addEventListener("transitionend", handleTransitionEnd);
    });
};

const fadeOutElement = (element, idx) => {
    return new Promise((resolve) => {
        element.style.transitionDelay = `${75 * idx}ms`;
        element.classList.add("fade-out");

        waitForTransitionEnd(element).then(() => resolve());
    });
};

export default async function emptyContent(container) {
    const sections = Array.from(container.children);
    const fadePromises = [];

    sections.forEach((section, idx) => {
        if (section.hasChildNodes()) {
            const children = Array.from(section.children);
            children.forEach((child, childIdx) => {
                fadePromises.push(fadeOutElement(child, childIdx));
            });
        } else {
            fadePromises.push(fadeOutElement(section, idx));
        }
    });

    await Promise.all(fadePromises);

    container.innerHTML = '';
}
