
var React = require('react');
var errorHandler = require("./errorHandler");
var bluebird = require("bluebird");
var _ = require("lodash");
var routes = require('../../client/js/routes.jsx');
var Router = require("react-router");
var jsManifest = require("./../build/assets/js/rev-manifest");
var cssManifest = require("./../build/assets/css/rev-manifest");

var argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;

module.exports = function handleRender(propertyHandler,view) {
    return function (request, reply) {
        var time1 = new Date();
        bluebird.props(propertyHandler(request,reply)).then(function(reactAppProps){
            Router.run(routes, request.path, function (Handler,state) {
                var model = {
                    content:  React.renderToStaticMarkup(<Handler {...state} {...reactAppProps}/>),
                  //  content:  React.renderToString(<Handler {...state} {...reactAppProps}/>),
                    props:safeStringify(reactAppProps),
                    bundleJs:jsManifest["bundle.js"],
                    bundleCss:cssManifest["styles.js"],
                    isProd: isProd
                };
                reply.view(view,model).type('Content-Type', 'text/html');
                var time2 = new Date();
                console.log(time2-time1,"ms for rendering");
            });

        }).catch(errorHandler(reply));

    }
};

function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

