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

export async function typeText(
  t: string,
  text_element: HTMLElement,
  min: number = 50,
  max: number = 100,
) {
  for (const letter of t) {
    let letter_min = min;
    let letter_max = max;
    if (letter === " ") {
      letter_min += 30;
      letter_max += 30;
    } else if (letter in ["q", "w", "z", "y", "g", "h"]) {
      letter_min += 10;
      letter_max += 10;
    } else if (letter in [".", ",", ";", ":", "?", "/", "!", "(", ")"]) {
      letter_min += 50;
      letter_max += 50;
    } else if (text_element.textContent.length <= 1) {
      letter_min -= 40;
      letter_max -= 80;
    }

    await sleep(randInt(letter_min, letter_max));
    text_element.textContent += letter;
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

export async function cycleText(
  texts: Array<string>,
  text_element: HTMLElement,
  col_element: HTMLElement,
) {
  await deleteText(text_element);
  let in_use: Array<string> = [];
  col_element.style.color = randHex();
  if (in_use.length === 0) {
    in_use = [...texts];
  }
  let t = in_use.splice(randInt(0, in_use.length - 1), 1)[0];

  await typeText(t, text_element, 50, 100);
  await sleep(randInt(200, 350));
  setTimeout(
    async () => await cycleText(texts, text_element, col_element),
    500,
  );
}
