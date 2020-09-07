const path = require('path');

module.exports = {
    entry: './src/OrchidLogic/init.ts',
    mode: "production",
    watchOptions: {
        ignored: ["node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    target: "electron-renderer",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
};