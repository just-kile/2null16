var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route;
    IndexRoute = Router.IndexRoute;


var App = require("./components/app.jsx"),
    Blog = require("./components/blog.jsx"),
    Article = require("./components/article.jsx"),
    UserList = require("./components/userList.jsx"),
    ResetPass = require("./components/resetPass.jsx"),
    EditArticle = require("./components/editArticle.jsx"),
    Login = require("./components/login.jsx");


var routes = (
    <Route>
        <Route path="blog" component={App}>
            <IndexRoute  component={Blog}/>
            <Route path=":articleId" component={Article}/>
       </Route>
        <Route path="admin" component={App}>
            <IndexRoute component={UserList}/>
            <Route path="edit/:articleId" component={EditArticle}/>
        </Route>
       <Route path="/" component={Login}/>
       <Route path="/reset/:resetToken" component={ResetPass}/>
    </Route>
);

module.exports = routes;