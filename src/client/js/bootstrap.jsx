var
    React = require('react'),
    Router = require('react-router').Router,
    routes = require("./routes.jsx"),
    //{fetch} = require("./services/fetchDataService.jsx"),
    { render } = require('react-dom'),
    createBrowserHistory = require("history/lib/createBrowserHistory");

    //fetch(state.routes, state.params).then((data) => {
    var history = createBrowserHistory();
    render(<Router history={history}>{routes}</Router>, document.getElementById("content"));
    //});
