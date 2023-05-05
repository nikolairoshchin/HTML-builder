const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "styles");
const destination = path.join(__dirname, "project-dist", "bundle.css");
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