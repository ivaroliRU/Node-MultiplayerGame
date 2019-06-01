const path = require('path');

var DIST_DIR = path.resolve(__dirname, "client/js");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    mode: 'production',
    entry : {
        main: SRC_DIR + "/Main.js"
    },
    output: {
        path: DIST_DIR,
        filename: "[name].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets:["es2015"]
                }
            }
        ]
    },
    node: {
        fs: "empty"
    }
};

module.exports = config;