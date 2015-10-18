var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var App = React.createClass({
    render () {
        return (
            <div>
                <header>
                    <Link to="index">ZM2k Blog</Link>
                </header>
                <RouteHandler {...this.props}/>
            </div>
        );
    }
});

module.exports = App;