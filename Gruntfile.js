'use strict';
module.exports = function(grunt) {
  // Load Grunt Tasks
  require('load-grunt-tasks')(grunt);

  // Initialize the Grunt object
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json')
  });

  // Copy HTML
  grunt.config.merge({
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: './',
            src: 'index.html',
            dest: 'build'
          }
        ]
      }
    }
  });

  // Merge Style Tasks
  grunt.config.merge({
    // Compile Sass
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'tmp/app.css': 'assets/scss/app.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')()
        ]
      },
      dist: {
        src: 'tmp/app.css',
        dest: 'build/app.css'
      }
    },

    // LiveReload
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'clean:tmp'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Merge Tasks for JavaScript
  grunt.config.merge({
    // Babel - ES6
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/js',
          src: '**/*.js',
          dest: 'build/js'
        }]
      }
    },

    // LiveReload
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: '**/*.js',
        tasks: ['babel'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Clean
  grunt.config.merge({
    clean: {
      build: ['build'],
      tmp: ['tmp']
    }
  });

  var coreTasks = [
    'copy',
    'sass',
    'postcss',
    'babel',
  ]

  var defaultTasks = coreTasks.concat(['watch'])

  var distTasks = ['clean:build'].concat(coreTasks).concat(['clean:tmp'])

  // Register Tasks
  grunt.registerTask('default', defaultTasks);
  grunt.registerTask('dist', distTasks);
};