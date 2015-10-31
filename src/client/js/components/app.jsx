var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('./../theme');

var App = React.createClass({
    childContextTypes : {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },
    render () {
        return (
            <div>
                <header>
                    <Link to="index">ZM2k Blog</Link>
                </header>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;