var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route;
    IndexRoute = Router.IndexRoute;


var App = require("./components/app.jsx"),
    Article = require("./components/article.jsx"),
    Dashboard = require("./components/dashboard.jsx"),
    Login = require("./components/login.jsx");


var routes = (
    <Route>
        <Route path="blog" component={App}>
            <IndexRoute  component={Article}/>
            <Route  path="article/:articleId" component={Article}/>
            <Route  path="dashboard" component={Dashboard}/>
       </Route>
       <Route path="/" component={Login}/>
    </Route>
);

module.exports = routes;