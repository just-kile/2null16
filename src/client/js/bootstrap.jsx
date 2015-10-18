var React = require('react'),
    Router = require('react-router'),
    routes = require("./routes.jsx"),
    {fetch} = require("./services/fetchDataService.jsx");


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    fetch(state.routes, state.params).then((data) => {
        React.render(<Handler {...state} {...data}/>, document.getElementById("content"));
    });
});