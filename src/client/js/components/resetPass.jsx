var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var TextField = require("material-ui/lib/text-field");
var RaisedButton = require("material-ui/lib/flat-button");
var Snackbar = require('material-ui/lib/snackbar');
var {Tab, Tabs } = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var ajaxService = require("./../services/ajaxService.jsx");
var MyRawTheme = require('./../theme');
var Login = React.createClass({
    childContextTypes : {
        muiTheme: React.PropTypes.object
    },
    getInitialState(){
        return {name: '',email:"",pass:""};
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },
    handleTextfieldChange(key,event){
        var state = {};
        state[key] = event.target.value;
        this.setState(state);
    },
    changePass(e){
        e.preventDefault();
        ajaxService.changePass(this.props.routeParams.resetToken,this.state.pass,() =>
            this.refs.snackbarSuccess.show()
        ,(err)=>
            this.refs.snackbarError.show()
        )
    },

    render () {
        return (
            <div className="login">
                <div className="login-logo">
                    <img className="pulse animated" src="/assets/public/logo-complete-square-dark.png" />
                </div>
                <div className="register-form">
                            <form onSubmit= {this.changePass}>
                                <div className="text-field"><TextField type="password" floatingLabelText="Passwort" value={this.state.pass} onChange={this.handleTextfieldChange.bind(this,"pass")}/></div>
                                <div className="text-field"><RaisedButton type="submit" label="Password ändern" primary={true} /></div>
                            </form>
                </div>
                <Snackbar ref="snackbarSuccess" message="Erfolg" />
                <Snackbar ref="snackbarError" message="Fehler!" />
            </div>

        );
    }

});


module.exports = Login;