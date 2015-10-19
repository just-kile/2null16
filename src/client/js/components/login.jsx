var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var TextField = require("material-ui/lib/text-field");
var FlatButton = require("material-ui/lib/flat-button");
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('./../theme');
var Login = React.createClass({
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
            <div className="login">
                <div className="login-logo">
                    <img className="" src="/assets/public/logo-complete-square-dark.png" />
                </div>
                <div className="register-form">
                    <form>
                        <TextField style={{marginRight:"5px"}} floatingLabelText="E-Mail" />
                        <TextField type="password" floatingLabelText="Passwort" />
                        <FlatButton label="Registrieren" primary={true} />
                    </form>
                </div>
            </div>

        );
    }
});


module.exports = Login;