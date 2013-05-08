module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-curl');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        curl: {
            'deploy/js/phaser.js' : 'https://github.com/photonstorm/phaser/raw/master/build/phaser.js',
            'deploy/js/phaser-fx.js' : 'https://github.com/photonstorm/phaser/raw/master/build/phaser-fx.js',
            'src/lib/Phaser/phaser.d.ts' : 'https://github.com/photonstorm/phaser/raw/master/build/phaser.d.ts',
            'src/lib/Phaser/phaser-fx.d.ts' : 'https://github.com/photonstorm/phaser/raw/master/build/phaser-fx.d.ts',
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './deploy'
                }
            }
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'deploy/js/game.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        }
    });

    grunt.registerTask('install-phaser', 'curl');


    grunt.registerTask('default', ['connect', 'open', 'watch']);

}