(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    paths: {
      "npm:": 'https://unpkg.com/',
      "github:": "https://raw.githubusercontent.com/tacitscript/tacitscript/master/src/",
    }, 
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'src/plugin-babel-0.0.25-tacitscript.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
      'tacitscript': "github:tacitscript.js",
    },
    meta: {
    '*.jsx': {
      babelOptions: {
        react: true
      }
    }
  }
  });
})(this);