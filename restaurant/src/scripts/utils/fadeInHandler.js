export default function fadeInHandler(target, container) {
    container.appendChild(target);

    target.offsetHeight;

    if (target.hasChildNodes()) {
        for (const child of target.children) {
            child.classList.remove('fade-out');
            child.classList.add('fade-in');
        }
    } else {
        target.classList.remove('fade-out');
        target.classList.add('fade-in');
    }

}