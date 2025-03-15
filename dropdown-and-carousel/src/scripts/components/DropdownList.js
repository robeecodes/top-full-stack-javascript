export default class DropdownList extends HTMLElement {
  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
              <style>
                  :host {
                    display: block;
                  }
                  
                  :host .header {
                      cursor: pointer;
                      font-weight: bold;
                      list-style-type: '👉 ';
                      display: list-item;
                      list-style-position: inside;
                      margin-bottom: .5rem;
                  }
                  
                  :host([aria-expanded="true"]) .header {
                      list-style-type: '👇 ';
                  }
                  
                  :host ::slotted(li),
                  :host ::slotted(ul),
                  :host ::slotted(dropdown-list) {
                      margin-left: 1.5rem;
                  }
              </style>
              <div class="header"></div>
              <slot></slot>
            `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.headerText =
      this.getAttribute("aria-labelledby") ??
      this.querySelector("li").textContent;
  }

  connectedCallback() {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("role", "dropdown");

    const header = this.shadowRoot.querySelector(".header");
    header.textContent = this.headerText;

    header.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggle();
    });
  }

  toggle() {
    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true",
    );
  }

  attributeChangedCallback(name, _, newValue) {
    if (name === "aria-expanded") {
      const slot = this.shadowRoot.querySelector("slot");
      const nodes = slot.assignedElements({ flatten: true });

      nodes.forEach((node) => {
        if (node.matches("ul, li, ol, dropdown-list")) {
          node.style.display = newValue === "true" ? "block" : "none";
          node.setAttribute(
            "aria-hidden",
            newValue === "true" ? "false" : "true",
          );
        }
      });
    }
  }
}
