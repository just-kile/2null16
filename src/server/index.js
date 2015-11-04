require('node-jsx').install({harmony: true, extension: '.jsx'});

var http = require('http'),
    Hapi = require('hapi'),
    _ = require('lodash'),
    path = require("path");

var renderViewHandler = require("./handlers/renderViewHandler"),
    renderJsonHandler = require("./handlers/renderJsonHandler"),
    articleService = require("./services/articleService");

var server = new Hapi.Server();
var SECRET = require("./config/config").jwtSecret;

server.connection({port: process.env.PORT || 1337});
server.register([
        {register: require('hapi-auth-jwt2')},
        require('vision'),
        require('inert')
    ],
    function (err) {
        if (err) throw err;
        server.views({
            engines: {jade: require('jade')},
            relativeTo: __dirname,
            path: './views',
            layoutKeyword: 'layout',
            compileOptions: {
                pretty: true
            }
        });

        server.auth.strategy('jwt', 'jwt',
            {
                key: SECRET,          // Never Share your secret key
                validateFunc: require("./auth/authHandler").validate,            // validate function defined above
                verifyOptions: {algorithms: ['HS256']}
            });

        server.auth.default('jwt');
        //public assets
        server.route({
            method: 'GET',
            path: '/assets/{p*}',
            handler: {
                directory: {
                    path: './build'
                }
            },
            config: {auth: false}
        });
        //API PUBLIC

        server.route({
            method: ['POST'],
            path: '/register',
            handler: require("./handlers/registerHandler"),
            config: {
                auth: false,
                validate: require("./handlers/registerHandler").validation
            }

        });

        server.route({
            method: ['POST'],
            path: '/login',
            handler: require("./handlers/loginHandler"),
            config: {
                auth: false,
                validate: require("./handlers/loginHandler").validation
            }

        });

        server.route({
            method: ['GET','POST'],
            path: '/logout',
            handler: require("./handlers/logoutHandler"),
            config:{auth:false}


        });


        //Views
        server.route({
            method: 'GET',
            path: '/',
            handler: renderViewHandler(function () {
                return {}
            }, "index"),
            config: {auth: false}
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



