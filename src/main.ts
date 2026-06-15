import "../style.css";
import { cycleText } from "./cycle-text.ts";
import RepoCard from "./repo-card.ts";

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
