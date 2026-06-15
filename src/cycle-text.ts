import "../style.css";

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

export async function cycleText(texts: Array<string>, element: HTMLElement) {
  await deleteText(element);
  let in_use: Array<string> = [];
  element.style.color = randHex();
  if (in_use.length === 0) {
    in_use = [...texts];
  }
  let t = in_use.splice(randInt(0, in_use.length - 1), 1)[0];

  await typeText(t, element);
  await sleep(randInt(200, 350));
  setTimeout(async () => await cycleText(texts, element), 500);
}
