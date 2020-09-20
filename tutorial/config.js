(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    globalName: "tutorial",
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'common/lib/plugin-babel_c72965b.js',
      'systemjs-babel-build': "common/lib/systemjs-babel-browser_c72965b-sloppy.js",
      "tacitscript": "common/src/tacitscript.js",
      "react": "https://cdnjs.cloudflare.com/ajax/libs/react/16.8.1/umd/react.development.js",
      "react-dom": "https://unpkg.com/react-dom@16.8.1/umd/react-dom.development.js",
      "material-ui": "https://unpkg.com/@material-ui/core@4.11.0/umd/material-ui.development.js",
      "history": "https://cdnjs.cloudflare.com/ajax/libs/history/4.7.2/history.js",
      "mocha": "https://cdnjs.cloudflare.com/ajax/libs/mocha/1.13.0/mocha.min.js",
    },
    babelOptions: {
      modularRuntime: false,
      react: true,
    },  
  });
})(this);