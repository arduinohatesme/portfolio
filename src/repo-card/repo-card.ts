import "./repo-card.css";

export default class RepoCard extends HTMLElement {
  static get observedAttributes() {
    return ["repo", "desc", "stars", "enabled"];
  }

  mkInnerHTML() {
    const repo = this.getAttribute("repo") || "Repo Name";
    const desc = this.getAttribute("desc") || "Description";
    const stars: number = Number(this.getAttribute("stars")) || 0;
    const enabled = Boolean(this.getAttribute("enabled")) || false;

    return `<style>
        .disabled-link {
          pointer-events: none;
        }
      </style>
      <a class="repo-link" href="https://git.arduinohates.me/${repo}" target="_blank" class=${enabled ? "" : ".disabled-link"}>
        <h3 class="repo-head">
          ${repo}
        </h3>
        <div class="repo-desc-stars">
          <p class="repo-desc">${desc}</p>
          <p class="repo-stars">${stars} ${stars === 1 ? "Star" : "Stars"}</p>
        </div>
      </a>`;
  }

  connectedCallback() {
    this.innerHTML = this.mkInnerHTML();
    const attrs = (this.constructor as typeof RepoCard).observedAttributes;
    attrs.forEach((attr) => {
      let preSetValue: unknown = undefined;

      if (Object.prototype.hasOwnProperty.call(this, attr)) {
        preSetValue = (this as any)[attr];
        delete (this as any)[attr];
      }

      if (preSetValue !== undefined) {
        (this as any)[attr] = preSetValue;
      }

      if (Object.getOwnPropertyDescriptor(this, attr)) {
        return;
      }

      Object.defineProperty(this, attr, {
        get() {
          return attr === "enabled"
            ? this.hasAttribute(attr)
            : this.getAttribute(attr) || "";
        },

        set(val: string | boolean) {
          if (attr === "enabled") {
            this.toggleAttribute(attr, Boolean(val));
          } else {
            this.setAttribute(attr, String(val));
          }
          this.render();
        },

        configurable: true,
        enumerable: true,
      });
    });
  }

  render(): void {
    this.innerHTML = this.mkInnerHTML();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      return;
    }

    if (name === "enabled") {
      return;
    }

    const el = this.querySelector(
      `.repo-${name === "stars" ? "stars" : name === "repo" ? "head" : "desc"}`
    );

    if (el) {
      el.textContent =
        name === "stars"
          ? `${(newValue as string) || 0} Stars`
          : (newValue as string) || "";
    }
  }
}
