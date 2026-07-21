import "./stack-card.css";
export default class StackCard extends HTMLElement {
  connectedCallback() {
    const dir_name = this.getAttribute("dir-name") || "No dir name";
    const disp_name = this.getAttribute("disp-name") || dir_name || "No name";
    const about = this.getAttribute("about") || "";

    this.innerHTML = `
      <a class="stack-link" href="https://github.com/arduinohatesme/dotfiles/tree/main/.config/${dir_name}" target="_blank">
        <h3 class="stack-head">
          ${disp_name}
        </h3>
        <div class="stack-about-container">
          <p class="stack-about">${about}</p>
        </div>
      </a>
    `;
  }
}
