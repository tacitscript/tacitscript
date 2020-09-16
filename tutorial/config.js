(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    globalName: "tutorial",
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'common/src/plugin-babel_c72965b-tacitscript.js',
      'systemjs-babel-build': "common/lib/systemjs-babel-browser_c72965b.js",
      "tacitscript": "common/src/tacitscript.js",
      "react": "https://cdnjs.cloudflare.com/ajax/libs/react/16.8.1/umd/react.development.js",
      "react-dom": "https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.1/umd/react-dom.production.min.js",
      "material-ui": "https://unpkg.com/@material-ui/core@4.11.0/umd/material-ui.development.js",
      "history": "https://cdnjs.cloudflare.com/ajax/libs/history/4.7.2/history.js",
    },
    babelOptions: {
      modularRuntime: false,
      react: true,
    },  
  });
})(this);