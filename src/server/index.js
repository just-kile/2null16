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
        {register: require('bell')},
        {register: require('hapi-auth-cookie')},
        {register: require('./plugins/auth')}],
    function (err) {
        if (err) throw err;

        server.route({
            method: 'GET',
            path: '/assets/{p*}',
            handler: {
                directory: {
                    path: './build/assets'
                }
            }
        });
//Api
        //PUBLIC
        server.route({
            method: 'GET',
            path: '/api/article/{articleId}',
            handler: renderJsonHandler(articleService.get)
        });

        server.route({
            method: 'GET',
            path: '/api/article/list',
            handler: renderJsonHandler(articleService.list)
        });
        //PRIVATE
        server.route({
            method: 'PUT',
            path: '/api/article/create',
            config: {
                auth: "session",
                handler: renderJsonHandler(articleService.save)
            }

        });

        server.route({
            method: 'DELETE',
            path: '/api/article/{articleId}',
            config: {
                auth: "session",
                handler: renderJsonHandler(articleService.remove)
            }

        });


//Views
        server.route({
            method: 'GET',
            path: '/',
            handler: renderViewHandler(articleService.list, "index")
        });

        server.route({
            method: 'GET',
            path: '/article/{articleId}',
            handler: renderViewHandler(articleService.get, "article")
        });

        server.route({
            method: 'GET',
            path: '/dashboard',
            config: {
                auth: 'session',
                handler: renderViewHandler(articleService.list, "index")
            }
        });

        server.start(function () {
            console.log('Server running at:', server.info.uri);
            console.log('Server started on port: ', server.info.port);
        });

    });



