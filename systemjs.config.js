(function (global) {
  System.config({
    transpiler: 'plugin-babel-tacitscript',
    paths: {
      "npm:": 'https://unpkg.com/',
      "ramda": "https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.js"
    }, 
    map: {
      // babel transpiler
      'plugin-babel-tacitscript': 'plugin-babel-0.0.25-tacitscript.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
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