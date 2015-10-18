var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;


var App = require("./components/app.jsx"),
    Article = require("./components/article.jsx"),
    Dashboard = require("./components/dashboard.jsx"),
    EntryList = require("./components/entrylist.jsx");

var routes = (
    <Route name="index" path="/" handler={App}>
        <Route name="article" path="article/:articleId" handler={Article}/>
        <Route name="dashboard" path="dashboard" handler={Dashboard}/>
        <DefaultRoute name="articles" handler={EntryList}/>
    </Route>
);


module.exports = routes;