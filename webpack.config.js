const path = require('path');

module.exports = {
    watch:true,
    entry: './asteroids.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
