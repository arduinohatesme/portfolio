import axios from "axios";

export async function getPinnedRepos() {
  let data: Array<Object> = [];
  await axios
    .get("https://pinned.berrysauce.dev/get/arduinohatesme")
    .then((response) => (data = response.data))
    .catch((err) => {
      console.log(`Error getting pinned repos: ${err}`);
      data = [err];
    });
  return data;
}
