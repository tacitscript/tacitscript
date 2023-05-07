var Builder = require('systemjs-builder');
var fs = require("fs");
const { exec } = require('child_process');

// es6 + jsx -> es5
var build = remainingBuilds => {
	const folder = remainingBuilds[0];
 	// sets the baseURL and loads the configuration file
    const builder = new Builder('./', `./${folder}/config.js`);
	const outputPath = `./${folder}/${folder}.js`;
    
	builder.buildStatic(`${folder}/logic/main.js`, outputPath, {
		minify: true,
		globalName: folder,
		globalDeps: {
			"react": "React",
			"react-dom": "ReactDOM",
			"jquery": "$",
			"material-ui": "MaterialUI",
			"react-scrollbars-custom": "Scrollbar",
			"ramda": "R",
		}
	}).then(function() {
		console.log(folder + ' build complete', outputPath);

		if (folder === "tutorial") { // required to enable in-place evaluation
			fs.readFile(outputPath, "utf8", (err, data) => {
				if (err) {
					console.log(err);
					return;
				}

				const result = data.replace(/"use strict";/g, "");

				fs.writeFile(outputPath, result, "utf8", err => {
					if (err) {
						console.log(err);
						return;
					}

					exec('git add tutorial/tutorial.js')
						.then(() => exec('git commit -m "Add generated tutorial build"'))
						.then(() => exec('git push origin gh-pages'))
						.then(() => console.log('All commands executed successfully'))
						.catch((error) => console.error(`Error executing command: ${error}`));
				});
			})
		}

		if (remainingBuilds.length > 1) build(remainingBuilds.slice(1));
	}).catch(function(err) {
		console.log(folder + ' build error');
		console.log(err);
		process.exit(1);
	});
};

const remainingBuilds = [
	//"test",
	"tutorial",
];

build(remainingBuilds);
