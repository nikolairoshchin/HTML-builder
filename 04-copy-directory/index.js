const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "files");
const destination = path.join(__dirname, "files-copy");

async function deleteDir(dir) {
  try {
    await fs.promises.access(dir);
    await fs.promises.rm(path.join(dir), { recursive: true, force: true });
  } catch {};
}


async function makeDir() {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) return console.error(err);
    fs.readdir(source,
	            { withFileTypes: true },
	            (err, files) => {
                for (const file of files) {
                  fs.copyFile(path.join(source, file.name),
  	            	            path.join(destination, file.name),
  	            	           (err) => {
  	                           if (err) return console.error(err);
  	                          });
              }
    });
  console.log('Directory created successfully!');
  });
}

async function copyDir() {
  await deleteDir(destination);
  makeDir();
}

copyDir();