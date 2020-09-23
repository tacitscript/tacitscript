(function (global) {
	System.config({
		transpiler: 'plugin-babel-tacitscript',
		paths: {
			"cdnjs:": "https://cdnjs.cloudflare.com/ajax/libs/",
			"npm:": "https://unpkg.com/",
		},
		map: {
			// babel transpiler
			'plugin-babel-tacitscript': 'common/lib/plugin-babel_c72965b.js',
			'systemjs-babel-build': "common/lib/systemjs-babel-browser_c72965b-sloppy.js",
			"tacitscript": "common/src/tacitscript.js",
			"history": "common/lib/history_4.7.2.js",
		},
		babelOptions: {
			modularRuntime: false,
			react: true,
		},  
	});
})(this);