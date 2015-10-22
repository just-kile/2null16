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
    register(){
        alert("Wuff")
    },
    render () {
        return (
            <div className="login">
                <div className="login-logo">
                    <img className="pulse animated" src="/assets/public/logo-complete-square-dark.png" />
                </div>
                <div className="register-form">
                    <form>
                        <div className="text-field"><TextField floatingLabelText="Name" /></div>
                        <div className="text-field"><TextField floatingLabelText="E-Mail" /></div>
                        <div className="text-field"><TextField type="password" floatingLabelText="Passwort" /></div>
                        <div className="text-field"><FlatButton onClick={this.register} label="Registrieren" primary={true} /></div>
                    </form>
                </div>
            </div>

        );
    }
});


module.exports = Login;