const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "files");
const destination = path.join(__dirname, "files-copy");

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
