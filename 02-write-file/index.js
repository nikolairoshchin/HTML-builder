const fs = require("fs");
const path = require("path");
const readline = require("readline");
const {
    stdin: input,
} = require("process");

const rl = readline.createInterface({ input });
const exit = rl.on("line", (line) => {
  if (line === "exit") process.exit();
});

const output = fs.createWriteStream(path.join(__dirname, "text.txt"));
console.log("Input text and press Enter.\nYou can find your text in text.txt file.\nType exit for quit")
input.pipe(output);
process.on("SIGINT", () => process.exit());
process.on("exit", () => console.log("That's all, folks!"));