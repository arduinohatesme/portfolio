import axios from "axios";
import "../style.css";
import { cycleText, typeText } from "./cycle-text.ts";
import RepoCard from "./repo-card/repo-card.ts";
import StackCard from "./stack-card/stack-card.ts";
import { possible_head_contents } from "./head-contents.ts";

const repo_cards: HTMLCollectionOf<Element> | null =
  document.getElementsByTagName("repo-card");
const head_cycle_element: HTMLElement | null =
  document.querySelector("#cycling-header");
const head_greeting_element: HTMLElement | null =
  document.querySelector("#head-greeting");
const head_color_element: HTMLElement | null =
  document.querySelector("#colored-head");

const declareStackCard = async () => {
  if (!customElements.get("stack-card")) {
    customElements.define("stack-card", StackCard);
  }
};

const typeHead = async () => {
  if (head_greeting_element) {
    await typeText(
      "Hi. I'm Aidan McMillan. I'm",
      head_greeting_element,
      20,
      70
    );
  }

  if (!head_color_element || !head_cycle_element) {
    return;
  }

  cycleText(possible_head_contents, head_cycle_element, head_color_element);
};

export async function getPinnedRepos() {
  const repos = [
    "arduinohatesme/dotfiles",
    "arduinohatesme/portfolio",
    "arduinohatesme/snowtracks",
    "arduinohatesme/lasagne-22",
  ];
  let repos_data: Array<JSON> = [];

  for (const repo of repos) {
    axios
      .get(`https://git.arduinohates.me/api/v1/repos/${repo}`)
      .then((res) => {
        console.log("got data", repos_data);
        repos_data.push(res.data);
      })
      .catch((err) => {
        console.log(`Error getting pinned repos: ${err}`);
        repos_data.push(err);
      });
  }

  console.log(repos_data);

  return repos_data;
}

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

    console.log(repo);

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
