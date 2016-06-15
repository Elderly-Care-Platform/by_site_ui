module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        timeStamp: Date.now(),
        cssBaseUrl: "src/webapp/assets/css",
        pkg: grunt.file.readJSON('package.json'),
        /*
         * Build a WAR (web archive) without Maven or the JVM installed.
         */
        config: {
            path: {
                webapp: {
                    root: 'src/webapp'
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
            concatCss: {
                src: ["dist/assets/css/final.css"]
            },
            removeByJs: {
                src: ["dist/app/components/**/*.js", "dist/app/main/**/*.js", "dist/app/shared/**/*.js"]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'src/webapp/',
                        src: ['**', '!**/assets/css/**', '**/assets/css/tinyMce_custom.css'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        concat: {
            byCSS: {
                src: ['<%= cssBaseUrl %>/ie8.css',
                    '<%= cssBaseUrl %>/blocks.css',
                    '<%= cssBaseUrl %>/plugins.css',
                    '<%= cssBaseUrl %>/app.css',
                    '<%= cssBaseUrl %>/style.css',
                    '<%= cssBaseUrl %>/headers/header-default.css',
                    '<%= cssBaseUrl %>/by-header.css',
                    '<%= cssBaseUrl %>/footers/footer-v1.css',
                    '<%= cssBaseUrl %>/main.css',
                    '<%= cssBaseUrl %>/custom.css',
                    '<%= cssBaseUrl %>/psc.css',
                    '<%= cssBaseUrl %>/aboutUs.css',
                    '<%= cssBaseUrl %>/by/by_editor.css',
                    '<%= cssBaseUrl %>/login.css',
                    '<%= cssBaseUrl %>/by/discussDetail.css',
                    '<%= cssBaseUrl %>/services.css',
                    '<%= cssBaseUrl %>/profile.css',
                    '<%= cssBaseUrl %>/by/replyCard.css',
                    '<%= cssBaseUrl %>/productSearch.css',
                    '<%= cssBaseUrl %>/image-gallery.css',
                    '<%= cssBaseUrl %>/by_quad.css',
                    '<%= cssBaseUrl %>/by/by_section_headers.css',
                    '<%= cssBaseUrl %>/by-menu.css',
                    '<%= cssBaseUrl %>/by-modalLogin.css',
                    '<%= cssBaseUrl %>/by_userType.css',
                    '<%= cssBaseUrl %>/by_regIndvLogin.css',
                    '<%= cssBaseUrl %>/by_sprite.css',
                    '<%= cssBaseUrl %>/by/by_discussCard.css',
                    '<%= cssBaseUrl %>/by/discuss_list_grid.css',
                    '<%= cssBaseUrl %>/by/housing.css',
                    '<%= cssBaseUrl %>/byProducts/product-style.css',
                    '<%= cssBaseUrl %>/byProducts/product.css',
                    '<%= cssBaseUrl %>/byProducts/product_housing.css',
                    '<%= cssBaseUrl %>/byProducts/shop-style.css',
                    '<%= cssBaseUrl %>/byProducts/productHome.css',
                    '<%= cssBaseUrl %>/byProducts/by_product_listing.css',
                    '<%= cssBaseUrl %>/byProducts/cart.css',
                    '<%= cssBaseUrl %>/byProducts/cartCheckout.css',
                    '<%= cssBaseUrl %>/byProducts/productDetailed.css',
                    '<%= cssBaseUrl %>/byProducts/order_history.css',
                    '<%= cssBaseUrl %>/share-modal.css',
                    '<%= cssBaseUrl %>/by/header.css',
                    '<%= cssBaseUrl %>/by/homeNew.css',
                    '<%= cssBaseUrl %>/by/menu.css',
                    '<%= cssBaseUrl %>/by/expStore.css',
                    '<%= cssBaseUrl %>/by/by_leftPanel.css',
                    '<%= cssBaseUrl %>/by/by_footer.css',
                    '<%= cssBaseUrl %>/by/by_homeModification.css',
                    '<%= cssBaseUrl %>/by/by_classesActivites.css'
                ],
                dest: 'dist/assets/css/final.css'
            },
            libCSS: {
                src: ['src/webapp/lib/unify/plugins/bootstrap/css/bootstrap.min.css',
                    'src/webapp/lib/jqueryPlugins/jquery-ui-1.11.4.custom/jquery-ui.min.css',
                    'src/webapp/lib/unify/plugins/bootstrap/css/bootstrap-toggle.min.css',
                    'src/webapp/lib/tagmanager-master/tagmanager.css',
                    'src/webapp/lib/unify/plugins/animate.css',
                    'src/webapp/lib/unify/plugins/line-icons/line-icons.css',
                    'src/webapp/lib/unify/plugins/font-awesome/css/font-awesome.min.css',
                    'src/webapp/lib/unify/plugins/flexslider/flexslider.css',
                    'src/webapp/lib/unify/plugins/parallax-slider/css/parallax-slider.css'],
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
                    src: ['dist/**/final.css', 'dist/**/finalLib.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'dist/app',
                    src: '**/*.js',
                    dest: 'dist/app/'
                }]
            }
        },
        replace: {
            version: {
                options: {
                    patterns: [
                        {
                            match: /%PROJECT_VERSION%/g,
                            replacement: '<%= timeStamp %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: false, src: ['dist/**/*.html', 'dist/**/*.js', 'dist/**/*.css'], dest: ''}
                ]
            },
            cssImagePath: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/\.\.\//g,
                            replacement: '../'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: false, src: ['dist/assets/css/final.css'], dest: ''}
                ]
            },
            productionHTML: {
                files: [{
                    cwd: 'src/webapp',
                    expand: true,
                    dest: 'dist',
                    src: ['index.html']
                }],
                options: {
                    patterns: [{
                        match: /\<\!--\s?@@dev-css\s?starts[\s\S]*@@dev-css\s?ends\s?-->/,
                        replacement: function () {
                            return '';
                        }
                    },
                    {
                        match: /\<\!--\s?@@dev-js\s?starts[\s\S]*@@dev-js\s?ends\s?-->/,
                        replacement: function () {
                            return '<script type="text/javascript" async src="lib/require.js" data-main="app/final/optimized.js?versionTimeStamp=%PROJECT_VERSION%"></script>';
                        }
                    }
                    ]
                }
            }
        },
        //requirejs: {
        //    compile: {
        //        options: {
        //            baseUrl: "dist/",
        //            mainConfigFile: "dist/app/shared/main.js",
        //            optimize:"none",
        //            out: "dist/app/final/optimized.js"
        //        }
        //    }
        //},
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/webapp/",
                    mainConfigFile: "src/webapp/app/shared/main.js",
                    optimize: "none",
                    out: "dist/app/final/optimized.js"
                }
            }
        },
        war: {
            target: {
                options: {
                    war_dist_folder: 'dist', /* Folder where to generate the WAR. */
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
        htmlmin: {                                     
            dist: {                                      
              options: {                                 
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{  
                expand: true,
                cwd: 'dist/',
                src: ['*.html', '**/*.html', '**/**/*.html', '**/**/**/*.html', '**/**/**/**/*.html'],
                dest: 'dist/'
                // expand: true,  
                // src: 'dist/**/*.html',
                // dest: 'dist/'
                //'dist/webapp/index.html': 'src/webapp/index.html'
                // ,                             
                // 'dist/app/components/**/*.html':'src/webapp/app/components/**/*.html'
              }]
            }
          }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-war');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    // Default task(s).
    //grunt.registerTask('default', ['clean:build', 'copy', 'concat:byCSS', 'concat:libCSS', 'replace:cssImagePath', 'cssmin', 'clean:concatCss', 'replace:prodCss', 'replace:version']);
    grunt.registerTask('default', ['clean:build', 'copy', 'uglify', 'concat:byCSS', 'concat:libCSS','replace:cssImagePath', 'cssmin', 'clean:concatCss', 'replace:productionHTML', 'requirejs', 'clean:removeByJs', 'replace:version', ]);
    grunt.registerTask('build', ['default', 'htmlmin' , 'war']);
    grunt.registerTask('ug', ['clean:build', 'copy', 'uglify']);

};