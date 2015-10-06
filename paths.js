var path = require('path');

var src = './src'
var build = './build'

module.exports = {
    source: {
        dir: src,
        src: path.join(src, '**/*.js'),
        views: {
            dir: path.join(src, 'views'),
            jadeFiles: path.join(src, 'views/**/*.jade'),
        },
        components: {
            dir: path.join(src,  'components'),
            src: path.join(src,  'components/**/*.js'),
        },
        routes: {
            dir: path.join(src,  'routes'),
            src: path.join(src,  'routes/**/*.js'),
        },
        pub: {
            dir: path.join(src, 'public'),
            src: path.join(src, 'public', '**/*.js'),
        }
    },
    build: {
        dir: build,
        src: path.join(build, '**/*.js'),
        views: {
            dir: path.join(build, 'views'),
            jadeFiles: path.join(build, 'views/**/*.jade'),
        },
        components: path.join(build, 'components/**/*.js'),
        pub: {
            dir: path.join(build, 'public'),
            src: path.join(build, 'public', '**/*.js'),
        }
    }
};
