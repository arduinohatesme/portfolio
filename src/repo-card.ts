export default class RepoCard extends HTMLElement {
  static get observedAttributes() {
    return ["repo", "desc", "stars", "enabled"];
  }

  connectedCallback() {
    const repo = this.getAttribute("repo") || "Repo Name";
    const desc = this.getAttribute("desc") || "Description";
    const stars = this.getAttribute("stars") || 0;
    const enabled = this.getAttribute("enabled") || false;

    this.innerHTML = `
      <style>
        .disabled-link {
          pointer-events: none;
        }
      </style>
      <a class="repo-link" href="https://github.com/${repo}" target="_blank" class=${enabled ? "" : ".disabled-link"}>
        <h3 class="repo-head">
          ${repo}
        </h3>
        <div class="repo-desc-stars">
          <p class="repo-desc">${desc}</p>
          <p class="repo-stars">${stars} ${stars === "1" ? "Star" : "Stars"}</p>
        </div>
      </a>
    `;

    const attrs = (this.constructor as typeof RepoCard).observedAttributes;
    attrs.forEach((attr) => {
      let preSetValue: unknown = undefined;
      if (Object.prototype.hasOwnProperty.call(this, attr)) {
        preSetValue = (this as any)[attr];
        delete (this as any)[attr];
      }

      if (!Object.getOwnPropertyDescriptor(this, attr)) {
        Object.defineProperty(this, attr, {
          get() {
            if (attr === "enabled") return this.hasAttribute(attr);
            return this.getAttribute(attr) || "";
          },

          set(val: string | boolean) {
            if (attr === "enabled") {
              if (val) this.setAttribute(attr, "");
              else this.removeAttribute(attr);
            } else {
              this.setAttribute(attr, String(val));
            }
            this.render();
          },

          configurable: true,
          enumerable: true,
        });
      }

      if (preSetValue !== undefined) {
        (this as any)[attr] = preSetValue;
      }
    });
  }

  render(): void {
    const repo = this.getAttribute("repo") || "Repo Name";
    const desc = this.getAttribute("desc") || "Description";
    const stars = this.getAttribute("stars") || 0;
    const enabled = this.getAttribute("enabled") || false;

    this.innerHTML = `
      <style>
        .disabled-link {
          pointer-events: none;
        }
      </style>
      <a class="repo-link" href="https://github.com/${repo}" target="_blank" class=${enabled ? "" : ".disabled-link"}>
        <h3 class="repo-head">
          ${repo}
        </h3>
        <div class="repo-desc-stars">
          <p class="repo-desc">${desc}</p>
          <p class="repo-stars">${stars} Stars</p>
        </div>
      </a>
    `;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue !== newValue) {
      return;
    }
    if (name !== "enabled") {
      const el = this.querySelector(
        `.repo-${name === "stars" ? "stars" : name === "repo" ? "head" : "desc"}`,
      );
      if (el) {
        el.textContent =
          name === "stars"
            ? `${(newValue as string) || 0} Stars`
            : (newValue as string) || "";
      }
    }
  }
}
