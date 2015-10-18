'use strict';


var appBase = './src/client/';
var buildDir = './build/';

module.exports = {
  host: 'localhost',
  port: 3001,

  appBase: appBase,
  appAssets: appBase+'public/**/*',
  appMarkupFiles: appBase + '**/*.{haml,html,jade}',
  appScriptFiles: appBase + '**/*.{coffee,js}',
  appStyleFiles: appBase + 'css/app.styl',
  appEntry: appBase + 'js/bootstrap.jsx',

  // build directories
  buildDir: buildDir,
  buildCss: buildDir + 'css',
  buildFonts: buildDir + 'fonts/',
  buildPublic: buildDir + 'public/',
  buildJs: buildDir + 'js',

  appPath: process.cwd() + '/'
};