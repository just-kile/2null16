
var React = require('react');
var errorHandler = require("./errorHandler");
var bluebird = require("bluebird");
var _ = require("lodash");
var routes = require('../../client/js/routes.jsx');
var Router = require("react-router");
var config = require("./../../../config/build.config")
try{
    var jsManifest = require("./../../../build/js/rev-manifest.json");
    var cssManifest = require("./../../../build/css/rev-manifest.json");

}catch(e){
    jsManifest = {};
    cssManifest = {};
}

var argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;

module.exports = function handleRender(propertyHandler,view) {
    return function (request, reply) {
        bluebird.props(propertyHandler(request,reply)).then(function(reactAppProps){
            Router.run(routes, request.path, function (Handler,state) {
                var model = {
                    content:  React.renderToStaticMarkup(<Handler {...state} {...reactAppProps}/>),
                    props:safeStringify(reactAppProps),
                    bundleJs:"/assets/js/" + (jsManifest["bundle.js"]||"bundle.js"),
                    bundleCss:"/assets/css/" +(cssManifest["styles.css"]||"styles.css"),
                    isProd: isProd
                };
                reply.view(view,model).type('Content-Type', 'text/html');
            });

        }).catch(errorHandler(reply));

    }
};

function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

