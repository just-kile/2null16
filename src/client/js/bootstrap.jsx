var
    React = require('react'),
    Router = require('react-router').Router,
    routes = require("./routes.jsx"),
    { render } = require('react-dom'),
    createBrowserHistory = require("history/lib/createBrowserHistory");


require("react-tap-event-plugin")();

var { createStore } = require('redux'),
    { Provider } = require('react-redux'),
    appReducer = require('./reducers/appReducer');

var history = createBrowserHistory();
var store = createStore(appReducer,window.TOTR);
render(
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>
, document.getElementById("content"));
