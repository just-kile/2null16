
var React = require('react');
var errorHandler = require("./errorHandler");
var bluebird = require("bluebird");
var _ = require("lodash");
var routes = require('../../client/js/routes.jsx');
var appReducer = require('../../client/js/reducers/appReducer');
var Router = require("react-router");
var {renderToString,renderToStaticMarkup} = require('react-dom/server');

var match = Router.match,
    RoutingContext =Router.RoutingContext;
var config = require("./../../../config/build.config");
var { createStore } = require('redux');
var { Provider } = require('react-redux');
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

            match({ routes, location: request.path }, (error, redirectLocation, renderProps) => {
                var store = createStore(appReducer, reactAppProps);
                global.navigator = {userAgent:request.headers["user-agent"]};
                var reactApp = renderToStaticMarkup(
                    <Provider store={store}>
                        <RoutingContext {...renderProps}/>
                    </Provider>
                );
                var model = {
                    content:  reactApp,
                    props:JSON.stringify(store.getState()||{}),
                    bundleJs:"/assets/js/" + (jsManifest["bundle.js"]||"bundle.js"),
                    bundleCss:"/assets/css/" +(cssManifest["styles.css"]||"styles.css"),
                    isProd: isProd
                };

                reply.view(view,model).type('Content-Type', 'text/html');

            });

        }).catch(errorHandler(reply));

    }
};

