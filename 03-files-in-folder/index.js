const fs = require("fs");
const path = require("path");

fs.readdir(path.join(__dirname, "secret-folder"),
	                { withFileTypes: true },
	                (err, files) => {
                      for (const file of files) {
  	                  if (file.isFile()) {
  	                    fs.stat(path.join(__dirname, "secret-folder", file.name), (erro, stats) => {
  	                  	  let name = file.name.split('.');
  	                  	  console.log(name[0], '-', name[1], '-', stats.size);
  	                    });
  	                  }
                    }
});