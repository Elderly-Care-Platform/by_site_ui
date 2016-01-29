module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        timeStamp: Date.now(),
        pkg: grunt.file.readJSON('package.json'),
        /*
         * Build a WAR (web archive) without Maven or the JVM installed.
         */
        config: {
            path: {
                webapp: {
                    root: 'src/main/webapp'
                },
                temp: {
                    root: 'temp'
                },
                build: {
                    root: 'build'
                }
            }
        },
        clean: {
            build: {
                src: ["dist/*"]
            },
            concatCss :{
                src : ["dist/assets/css/final.css"]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd:'src/main/webapp/', src: ['**', '!**/assets/css/**'], dest: 'dist/'}
                ]
            }
        },
        concat: {
            byCSS: {
                src: ['src/main/webapp/assets/css/**/*.css'],
                dest: 'dist/assets/css/final.css'
            },
            libCSS: {
                src: ['src/main/webapp/lib/unify/plugins/bootstrap/css/bootstrap.min.css',
                    'src/main/webapp/lib/jqueryPlugins/jquery-ui-1.11.4.custom/jquery-ui.min.css',
                    'src/main/webapp/lib/unify/plugins/bootstrap/css/bootstrap-toggle.min.css',
                    'src/main/webapp/lib/unify/plugins/animate.css',
                    'src/main/webapp/lib/unify/plugins/line-icons/line-icons.css',
                    'src/main/webapp/lib/unify/plugins/font-awesome/css/font-awesome.min.css',
                    'src/main/webapp/lib/unify/plugins/flexslider/flexslider.css',
                    'src/main/webapp/lib/unify/plugins/parallax-slider/css/parallax-slider.css',
                    'src/main/webapp/lib/tagmanager-master/tagmanager.css'],
                dest: 'dist/assets/css/finalLib.css'
            }
        },
        cssmin: {
            options: {
                processImport: false,
            },
            target: {
                files: [{
                    expand: true,
                    //cwd: 'dist/assets/css',
                    src: ['dist/assets/css/final.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },
        war: {
            target: {
                options: {
                    war_dist_folder: 'target', /* Folder where to generate the WAR. */
                    war_name: 'ROOT', /* The name fo the WAR file (.war will be the extension) */
                    webxml_welcome: 'index.html'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        },
        replace: {
            version:{
                options: {
                    patterns: [
                        {
                            match: /%PROJECT_VERSION%/g,
                            replacement:'<%= timeStamp %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: false, src: ['dist/**/*.html', 'dist/**/*.js', 'dist/**/*.css'], dest: ''}
                ]
            },
            cssImagePath:{
                options: {
                    patterns: [
                        {
                            match: /\.\.\/\.\.\//g,
                            replacement:'../'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: false, src: ['dist/assets/css/final.css'], dest: ''}
                ]
            }
        },

        //resolvePath: {
        //    dist: {
        //        options: {
        //            patterns: [
        //                {
        //                    match: '../../',
        //                    replacement:'../'
        //                    //replacement: function () {
        //                    //    return '<%= timeStamp %>'; // replaces "foo" to "bar"
        //                    //}
        //                }
        //            ]
        //        },
        //        files: [
        //            {expand: false, flatten: false, src: ['dist/assets/css/final.css'], dest: ''}
        //        ]
        //    }
        //}
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-war');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');


    // Default task(s).
    grunt.registerTask('default', ['clean:build', 'copy', 'concat:byCSS', 'replace:cssImagePath', 'cssmin', 'replace:version', 'clean:concatCss']);
    grunt.registerTask('cp', ['clean', 'copy']);
    grunt.registerTask('min', ['cssmin']);
    grunt.registerTask('build', ['war']);

};