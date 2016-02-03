module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        timeStamp: Date.now(),
        cssBaseUrl: "src/main/webapp/assets/css",
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
            concatCss: {
                src: ["dist/assets/css/final.css"]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {expand: true, cwd: 'src/main/webapp/', src: ['**', '!**/assets/css/**'], dest: 'dist/'}
                ]
            }
        },
        concat: {
            byCSS: {
                src: ['<%= cssBaseUrl %>/headers/header-default.css',
                    '<%= cssBaseUrl %>/by-header.css',
                    '<%= cssBaseUrl %>/footers/footer-v1.css',
                    '<%= cssBaseUrl %>/main.css',
                    '<%= cssBaseUrl %>/custom.css',
                    '<%= cssBaseUrl %>/psc.css',
                    '<%= cssBaseUrl %>/style.css',
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
                ],
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
            prodCss:{
                files:[{
                    cwd:'src/main/webapp',
                    expand:true,
                    dest:'dist',
                    src:['index.html']
                }],
                options:{
                    patterns:[{
                        match:/\<\!--\s?@@dev-css\s?starts[\s\S]*@@dev-css\s?ends\s?-->/,
                        replacement:function(){
                            return '<link rel="stylesheet" href="assets/css/final.min.css?versionTimeStamp=%PROJECT_VERSION%"> \n <link rel="stylesheet" href="assets/css/finalLib.css?versionTimeStamp=%PROJECT_VERSION%">';
                        }
                    }]
                }
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
    grunt.registerTask('default', ['clean:build', 'copy', 'concat:byCSS', 'concat:libCSS', 'replace:cssImagePath', 'cssmin', 'clean:concatCss', 'replace:prodCss', 'replace:version']);
    grunt.registerTask('build', ['default', 'war']);

};