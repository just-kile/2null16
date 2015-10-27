var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;


var App = require("./components/app.jsx"),
    Article = require("./components/article.jsx"),
    Dashboard = require("./components/dashboard.jsx"),
    Login = require("./components/login.jsx");


var routes = (
    <Route name="index">
        <Route name="wuff" path="/blog" handler={App}>
            <Route name="article" path="article/:articleId" handler={Article}/>
            <Route name="restricted" path="restricted" handler={Article}/>
            <Route name="dashboard" path="dashboard" handler={Dashboard}/>
       </Route>
       <Route path="/" name="articles" handler={Login}/>
    </Route>
);


module.exports = routes;