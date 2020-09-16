(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    globalName: "test",
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'common/src/plugin-babel_c72965b-tacitscript.js',
      'systemjs-babel-build': "common/lib/systemjs-babel-browser_c72965b.js",
      "tacitscript": "common/src/tacitscript.js",
    },
    babelOptions: {
      modularRuntime: false,
      react: true,
    },  
  });
})(this);