import "../style.css";

const text_element: HTMLElement | null = document.querySelector(
  "#cycling-experience",
);

const text_contents: Array<string> = [
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
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function randHex() {
  let hex: Array<string> = ["#"];
  for (let i = 0; i < 3; i++) {
    hex.push(randInt(5, 15).toString(16));
  }
  return hex.join("");
}

async function typeText(t: string, element: HTMLElement) {
  for (const letter of t) {
    let min = 50;
    let max = 100;
    if (letter === " ") {
      min += 30;
      max += 30;
    } else if (letter in ["q", "w", "z", "y", "g", "h"]) {
      min += 10;
      max += 10;
    } else if (letter in [".", ",", ";", ":", "?", "/", "!", "(", ")"]) {
      min += 50;
      max += 50;
    } else if (element.textContent.length <= 1) {
      min -= 40;
      max -= 80;
    }
    await sleep(randInt(min, max));
    element.textContent += letter;
  }
}

async function deleteText(element: HTMLElement) {
  for (const _ of element.textContent) {
    await sleep(randInt(80, 100));
    element.textContent = element.textContent.substring(
      0,
      element.textContent.length - 2,
    );
  }
}

async function iterateText(texts: Array<string>, element: HTMLElement) {
  let in_use: Array<string> = [];
  while (true) {
    element.style.color = randHex();
    if (in_use.length === 0) {
      in_use = [...texts];
    }
    let t = in_use.splice(randInt(0, in_use.length - 1), 1)[0];
    await typeText(t, element);
    await sleep(randInt(200, 350));
    await deleteText(element);
  }
}

if (text_element !== null) {
  await iterateText(text_contents, text_element);
}
