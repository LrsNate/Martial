'use strict';

module.exports = {
    context: __dirname + "/app",
    entry: "./app.js",
    output: {
        path: __dirname + "/app",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};