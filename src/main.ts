import "../style.css";
import { cycleText } from "./cycle-text.ts";
import { getPinnedRepos } from "./get-pinned.ts";
import RepoCard from "./repo-card.ts";

const repo_cards: HTMLCollectionOf<Element> | null =
  document.getElementsByTagName("repo-card");
const head_cycle_element: HTMLElement | null =
  document.querySelector("#cycling-header");

const possible_head_contents: Array<string> = [
  "a software engineer.",
  "a maker.",
  "a builder of all things cool!",
  "an arch user (btw).",
  "a neovim user (btw).",
  "the band spirit!",
  "a fusioneer!",
  "the centerer of divs.",
  "more skilled than yesterday.",
  "a trad coder.",
  "not an outsourced thinker.",
  "a bad frontend dev.",
  "a rock climber!",
  "half-decent at Python.",
  "learning Rust.",
];

if (head_cycle_element !== null) {
  cycleText(possible_head_contents, head_cycle_element);
}

if (!customElements.get("repo-card")) {
  customElements.define("repo-card", RepoCard);
}

const repos: Array<Object> = await getPinnedRepos();

for (const [i, card] of Array.from(repo_cards).entries()) {
  let repo = repos[i];
  if (repo === undefined) {
    card.remove();
    continue;
  }
  if (
    "author" in repo &&
    "name" in repo &&
    "description" in repo &&
    "stars" in repo &&
    "desc" in card &&
    "repo" in card &&
    "stars" in card
  ) {
    card.repo = `${repo.author}/${repo.name}`;
    card.desc = repo.description;
    card.stars = repo.stars;
    (card as any).enabled = "enabled";
  }
}
