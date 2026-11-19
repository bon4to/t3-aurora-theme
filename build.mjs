import { readFile, writeFile } from "node:fs/promises";

const [css, colors, artwork] = await Promise.all([
  readFile(new URL("theme.css", import.meta.url), "utf8"),
  readFile(new URL("colors.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("t3-aurora.png", import.meta.url)),
]);

const artUrl = `url(data:image/png;base64,${artwork.toString("base64")})`;
const theme = {
  version: 1,
  name: "Aurora TTY",
  appearance: "dark",
  colors,
  css: css.replace("url(__ART__)", artUrl),
};

await writeFile(
  new URL("t3-aurora.json", import.meta.url),
  `${JSON.stringify(theme)}\n`,
);

console.log("built t3-aurora.json");
