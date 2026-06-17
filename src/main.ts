import "../style.css";
import { cycleText, typeText } from "./cycle-text.ts";
import { getPinnedRepos } from "./get-pinned.ts";
import RepoCard from "./repo-card/repo-card.ts";
import StackCard from "./stack-card/stack-card.ts";

const repo_cards: HTMLCollectionOf<Element> | null =
  document.getElementsByTagName("repo-card");
const head_cycle_element: HTMLElement | null =
  document.querySelector("#cycling-header");
const head_greeting_element: HTMLElement | null =
  document.querySelector("#head-greeting");
const head_color_element: HTMLElement | null =
  document.querySelector("#colored-head");

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
  "an up-and-coming Rusteacean!",
  "smarter than the average bear.",
  "doing my own thing.",
  "vibing without AI.",
  "still learning.",
  "working on the puns.",
  "never done with my dotfiles.",
  "in control of my computer.",
  "still at it!",
  "a passable Horn player.",
];

const declareStackCard = async () => {
  if (!customElements.get("stack-card")) {
    customElements.define("stack-card", StackCard);
  }
};

const typeHead = async () => {
  if (head_greeting_element !== null) {
    await typeText(
      "Hi. I'm Aidan McMillan. I'm",
      head_greeting_element,
      20,
      70,
    );
  }

  if (head_cycle_element !== null && head_color_element) {
    cycleText(possible_head_contents, head_cycle_element, head_color_element);
  }
};

const makeRepoCards = async () => {
  if (!customElements.get("repo-card")) {
    customElements.define("repo-card", RepoCard);
  }

  const repos = await getPinnedRepos();
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
};

Promise.all([typeHead(), makeRepoCards(), declareStackCard()]);
