export default class RepoCard extends HTMLElement {
  connectedCallback() {
    const repo = this.getAttribute("repo") || "Repo Name";
    const desc = this.getAttribute("desc") || "Description";
    const stars = this.getAttribute("stars") || "Stars";

    this.innerHTML = `
    <a class="repo-link" href="https://github.com/${repo}" target="_blank">
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
}
