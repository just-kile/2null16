require('node-jsx').install({harmony: true,extension: '.jsx'});

var http = require('http'),
    Hapi = require('hapi'),
    _ = require('lodash'),
    path = require("path");

var
    renderViewHandler = require("./handlers/renderViewHandler"),
    renderJsonHandler = require("./handlers/renderJsonHandler"),
    articleService = require("./services/articleService");

var server = new Hapi.Server();
server.views({
    engines: {jade: require('jade')},
    path: __dirname + '/views',
    compileOptions: {
        pretty: true
    }
});
server.connection({port: process.env.PORT || 1337});
server.register([
        {register: require('hapi-auth-jwt2')}],
    function (err) {
        if (err) throw err;
        server.auth.strategy('jwt', 'jwt',
            { key: 'NeverShareYourSecret',          // Never Share your secret key
                validateFunc: require("./auth/authHandler").validate,            // validate function defined above
                verifyOptions: { algorithms: [ 'HS256' ] }
        });
        server.auth.default('jwt');
        server.route({
            method: 'GET',
            path: '/assets/{p*}',
            handler: {
                directory: {
                    path: './build'
                }
            },
            config:{auth:false}
        });
//Api
        //PUBLIC
        server.route({
            method: 'GET',
            path: '/login',
            handler: function(req,reply){
                
            }
        });

        server.route({
            method: 'GET',
            path: '/api/blog/{articleId}',
            handler: renderJsonHandler(articleService.get)
        });


//Views
        server.route({
            method: 'GET',
            path: '/',
            handler: renderViewHandler(articleService.list, "index"),
            config:{auth:false}
        });

        server.route({
            method: 'GET',
            path: '/blog',
            handler: renderViewHandler(articleService.get, "article")

        });


        server.start(function () {
            console.log('Server running at:', server.info.uri);
            console.log('Server started on port: ', server.info.port);
        });

    });



