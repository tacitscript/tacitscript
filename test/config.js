(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    globalName: "test",
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'common/src/plugin-babel-0.0.25-tacitscript.js',
      'systemjs-babel-build': "common/lib/systemjs-babel-browser_c72965b.js",
      "tacitscript": "common/src/tacitscript.js",
    },
    babelOptions: {
      react: true,
    },  
  });
})(this);