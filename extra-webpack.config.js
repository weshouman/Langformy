// Hints
// first sol: node: {fs: empty} complaines about the undefined "exists" in "binding.js"
// second sol: target: {'async-node'} complaines about the exports is not defined, which sounds like npm require ecosystem isnt used according to the docs.
// thus the first sol seems to be more of working than the second
// cheap-module-eval-source is important for figuring out the source of error, follow https://www.youtube.com/watch?v=7b-1qWvQdqY

// first sol (not sure about the second sol) also keeps the browser broken with the fs dependency missing error

// Does the second solution allow running the browser edition?

module.exports = {
  // allow use of pre-required fs and path ie: in native.js
  // to avoid the webpack behavior of inability to require them.
  externals: {
    fs: 'fs_module',
    path: 'path_module'
  },
  // allow usage of __filename in dependencies ie: in bindings.js
  // for errorStackTrace support we need also correct extraction of filename
  // from getEvalOrigin, note: bindings specifically doesn't work with webpack 
  node: {
    __filename: true,
    __dirname: true
  },
  devtool: 'cheap-module-eval-source'
};


// module.exports = {
//   target: "async-node",
//   devtool: 'cheap-module-eval-source'
// };

