const fs = require("fs");
const path = require("path");
const readline = require("readline");

const componentsDir = path.join(__dirname, "components");
const destinationDir = path.join(__dirname, "project-dist");



const tempTag = /{{\w+}}/g;
let tagArray = [];
let template = "";

async function deleteDir(dir) {
  try {
    await fs.promises.access(dir);
    await fs.promises.rm(path.join(dir), { recursive: true, force: true });
  } catch {};
}

async function makeDir() {
  fs.mkdir(destinationDir, { recursive: true }, (err) => {
    if (err) return console.error(err);
  });
}


async function buildHtml() {
const indexHtml = fs.createWriteStream(path.join(destinationDir, "index.html"), { flags: fs.O_APPEND });
let template = await fs.promises.readFile(path.join(__dirname, "template.html"), "utf-8");
	tagArray = template.match(tempTag);
	for(const tag of tagArray) {
		let fileName = tag.substring(2, tag.length - 2);
        await fs.promises.readFile(path.join(componentsDir, `${fileName}.html`), "utf-8")
          .then((comp) => {
            template = template.replace(tag, comp);
          })
          .catch((error) => {
            console.log(error);
          });
	}
await indexHtml.write(template);
}


function buildStyles() {
  const source = path.join(__dirname, "styles");
  const destination = path.join(destinationDir, "style.css");
  const output = fs.createWriteStream(destination, { flags: fs.O_APPEND });

  fs.readdir(source,
            { withFileTypes: true },
            (err, files) => {
           	  for (const file of files) {
                if (file.isFile() && (path.extname(file.name) === ".css")) {
                  const readStream = fs.createReadStream(path.join(source, file.name), "utf-8");
                  readStream.on("data", chunk => output.write(chunk));
                }
           	  }
            }
  )
}


function copyDirectory(source, destination) {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) return console.error(err);
    fs.readdir(source,
	          { withFileTypes: true },
	          (err, files) => {
                for (const file of files) {
                  if (file.isDirectory()) {
                  	copyDirectory(path.join(source, file.name), path.join(destination, file.name));
                  } else {
                    fs.copyFile(path.join(source, file.name),
                       	        path.join(destination, file.name),
                       	        (err) => {
                                  if (err) return console.error(err);
                                });
                  }
              }
    });
  });
}

async function buildPage() {
  await deleteDir(destinationDir);
  await makeDir();
  buildHtml();
  buildStyles();
  copyDirectory(path.join(__dirname, "assets"), path.join(destinationDir, "assets"));
}

buildPage();