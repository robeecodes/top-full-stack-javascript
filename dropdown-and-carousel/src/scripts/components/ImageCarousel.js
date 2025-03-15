export default class ImageCarousel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");

    template.innerHTML = `
        <style>
            :host {
                display: grid;
                grid-template-areas: 
                    "image image image"
                    "image image image"
                    "image image image"
                    "description description description"
                    "tabs tabs tabs";
                    grid-template-columns: auto 1fr auto;
                    grid-template-rows: 0 1fr auto auto auto;
                width: 50vw;
                margin: 0 auto;
            }
            :host button {
                background: none;
                padding: 0;
                font-size: 2rem;
                cursor: pointer;
            }
            :host button[aria-label="Autoplay"].controls {
                grid-area: image;
                grid-column: 1 / span 1;
                grid-row: 1 / span 1;
                z-index: 1;
                
                transform: translateY(50%);
            }
            :host button.controls {
                grid-area: image;
                grid-row: 2 / span 1;
                border: none;
                align-self: center;
                z-index: 1;
                
                transition: all 0.2s;
            }
            :host button.controls:hover {
                filter: brightness(1.2);
            }
            :host button.controls:active, :host button.controls[aria-label="Autoplay"][aria-pressed="true"] {
                filter: brightness(0.8);
            }
            :host button[aria-label="Previous Slide"] {
                grid-column: 1 / span 1;
            }
            :host button[aria-label="Next Slide"] {
                grid-column: 3 / span 1;
            }
            :host .tabs {
                grid-area: tabs;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                margin-top: .5rem;
            }
            :host button.tab {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                margin: 0.25rem;
            }
            :host button.tab[aria-selected="true"] {
                background: black;
            }
            :host .description {
                grid-area: description;
                text-align: center;
                margin-top: .5rem;
            }
            ::slotted(img) {
                grid-area: image;
                grid-column: 1 / span 3;
                width: 100%;
                height: 100%;
            }
        </style>
        <button type="button" aria-label="Autoplay" aria-pressed="false" class="controls">⏯️</button>
        <button type="button" aria-label="Previous Slide" class="controls">◀️</button>
        <button type="button" aria-label="Next Slide" class="controls">▶️</button>
        <slot></slot>
        <div class="description"></div>
        <div class="tabs"></div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.images = this.querySelectorAll("img");
    this.tabList = this.shadowRoot.querySelector(".tabs");
    this.description = this.shadowRoot.querySelector(".description");
    this.idx = 0;
    this.autoPlay = true;
    this.carouselTimer = null;

    this.setAttribute("aria-roledescription", "carousel");
  }

  connectedCallback() {
    this.images.forEach((image, i) => {
      image.setAttribute("aria-hidden", "true");
      image.setAttribute("role", "presentation");
      image.setAttribute("aria-roledescription", "slide");
      image.setAttribute("aria-label", `${i + 1} of ${this.images.length}`);
      image.style.display = "none";

      const tab = document.createElement("button");
      tab.classList.add("tab");
      tab.role = "tab";
      tab.tabIndex = -1;
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("aria-controls", `carousel-item-${i + 1}`);
      this.tabList.appendChild(tab);

      tab.addEventListener("click", () => this.setImage(i));
    });

    this.tabList.children[this.idx].setAttribute("aria-selected", "true");

    this.images[this.idx].setAttribute("aria-hidden", "false");
    this.images[this.idx].style.display = "block";

    // Configure buttons
    this.prevButton = this.shadowRoot.querySelector(
      "button[aria-label='Previous Slide']",
    );
    this.nextButton = this.shadowRoot.querySelector(
      "button[aria-label='Next Slide']",
    );

    this.nextButton.addEventListener("click", () => {
      this.moveImage(1);
    });

    this.prevButton.addEventListener("click", () => {
      this.moveImage(-1);
    });

    const autoButton = this.shadowRoot.querySelector(
      "button[aria-label='Autoplay']",
    );

    autoButton.addEventListener("click", () => {
      this.autoPlay = !this.autoPlay;
      autoButton.setAttribute("aria-pressed", this.autoPlay ? "false" : "true");
      if (this.autoPlay) this.playCarousel();
    });

    this.playCarousel();
  }

  playCarousel() {
    if (this.autoPlay) {
      this.moveImage(1);
      if (!this.carouselTimer) {
        this.carouselTimer = setTimeout(() => {
          this.carouselTimer = null;
          this.playCarousel();
        }, 5000);
      }
    } else if (this.carouselTimer) {
      clearTimeout(this.carouselTimer);
      this.carouselTimer = null;
    }
  }

  setImageVisibility(idx, isVisible) {
    const image = this.images[idx];
    image.setAttribute("aria-hidden", isVisible ? "false" : "true");
    image.style.display = isVisible ? "block" : "none";
    if (isVisible) {
      this.description.textContent = image.alt;
    }
  }

  updateTabAndImageState(idx, isVisible) {
    this.setImageVisibility(idx, isVisible);
    this.tabList.children[idx].setAttribute(
      "aria-selected",
      isVisible ? "true" : "false",
    );
  }

  moveImage(direction) {
    this.updateTabAndImageState(this.idx, false);
    this.idx = (this.idx + direction + this.images.length) % this.images.length;
    this.updateTabAndImageState(this.idx, true);
  }

  setImage(idx) {
    this.updateTabAndImageState(this.idx, false);
    this.idx = idx;
    this.updateTabAndImageState(this.idx, true);
  }
}
