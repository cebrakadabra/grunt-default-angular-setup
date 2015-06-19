module.exports = function(grunt) {

// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.initConfig({
    browserify: {
      js: {
        options: {

        },
        // A single entry point for our app
        src: [
          'app/js/app.js',
          'app/js/controller/*.js',
          'app/js/services/*.js',
          'app/js/directives/*.js'
        ],
        // Compile to a single file to add a script tag for in your HTML
        dest: 'dist/js/build.js',
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/build.min.css': ['app/css/*.css']
        }
      }
    },
    sass: {
      dist: {
        // files: {
        //   'dist/public/css/build.css': ['app/css/*.scss']
        // }
        files: [{
          expand: true,
          cwd: 'app/scss',
          src: ['*.scss'],
          dest: 'app/css',
          ext: '.css'
        }]
      }
    },
    copy: {
      html: {
        // This copies all the html and css into the dist/ folder
        expand: true,
        cwd: 'app/',
        src: ['**/*.html'],
        dest: 'dist/',
      },
      images: {
        expand: true,
        cwd: 'app/',
        src: ['images/*'],
        dest: 'dist/',
      },
      fonts: {
        expand: true,
        cwd: 'app/',
        src: ['fonts/*'],
        dest: 'dist/',
      }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/js/**/*.js', 'app/js/app.js'],
      options: {
          // more options here if you want to override JSHint defaults
        esnext: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    docco: {
      app: {
        src: [
          'app/js/**/*.js'
        ],
        options: {
          output: 'docs/app'
        }
      }
    },
    watch: {
      html: {
        files: ['app/index.html','app/partials/*.html'],
        tasks: ['copy', 'docco'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/scss/*.scss'],
        tasks: ['sass', 'cssmin', 'docco'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'browserify', 'docco']
      }
    }
});



// register Grunt tasks
grunt.registerTask('default', ['browserify', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('dev', ['browserify', 'sass', 'cssmin', 'copy', 'jshint', 'watch']);
grunt.registerTask('prod', ['browserify', 'sass', 'cssmin', 'copy', 'jshint', 'docco']);
grunt.registerTask('doc', ['docco']);

};
