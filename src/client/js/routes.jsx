var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route;
    IndexRoute = Router.IndexRoute;


var App = require("./components/app.jsx"),
    Blog = require("./components/blog.jsx"),
    Article = require("./components/article.jsx"),
    Login = require("./components/login.jsx");


var routes = (
    <Route>
        <Route path="blog" component={App}>
            <IndexRoute  component={Blog}/>
            <Route path=":articleId" component={Article}/>
       </Route>
       <Route path="/" component={Login}/>
    </Route>
);

module.exports = routes;