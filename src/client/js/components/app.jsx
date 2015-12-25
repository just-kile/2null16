var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var {IconButton} = require('material-ui');
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
                    <div className="n16-header-item n16-logo">
                        <Link to="/blog">
                            <img src="/assets/public/logo-complete-long-dark-no-background.png" />
                        </Link>
                    </div>
                    <div className="n16-header-item n16-logout-link">
                        <Link to="/">
                            <IconButton iconClassName="material-icons" tooltip="Ausloggen">power_settings_new</IconButton>
                        </Link>
                    </div>
                </header>
                <article>
                    {this.props.children}
                </article>
                <footer>
                    <hr />
                    <div>© 2016 - 2null16.de</div>
                </footer>
            </div>
        );
    }
});

module.exports = App;