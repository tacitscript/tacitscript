var Builder = require('systemjs-builder');

// es6 + jsx -> es5
var build = remainingBuilds => {
	const folder = remainingBuilds[0];
 	// sets the baseURL and loads the configuration file
    const builder = new Builder('./', `./${folder}/config.js`);
    
	builder.buildStatic(`${folder}/logic/main.js`, `./${folder}/${folder}.js`, {
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
		console.log(folder + ' build complete');

		if (remainingBuilds.length > 1) build(remainingBuilds.slice(1));
	}).catch(function(err) {
		console.log(folder + ' build error');
		console.log(err);
		process.exit(1);
	});
};

const remainingBuilds = [
	"test",
	"tutorial",
];

build(remainingBuilds);
