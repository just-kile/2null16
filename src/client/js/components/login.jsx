var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var TextField = require("material-ui/lib/text-field");
var FlatButton = require("material-ui/lib/flat-button");
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
    register(e){
        e.preventDefault();
        ajaxService.register(this.state,()=>
                this.props.history.pushState(null,'/blog')

        ,function(err){
                try{
                    alert(JSON.parse(err).message);
                }catch(e){
                    alert("Ein unbekannter Fehler ist aufgetreten.")
                }

        })
    },
    forgotPassPhrase(){
        var email = window.prompt("Bitte gib deine Email Adresse ein!");
        if(email){
            ajaxService.resetPass(email,this.refs.snackbarSuccess.show,this.refs.snackbarError.show);
        }
    },
    login(e){
        e.preventDefault();
        ajaxService.login(this.state.email,this.state.pass,()=>
                this.props.history.pushState(null,'/blog')

            ,function(err){
                if(err.statusCode===403){

                }
                try{
                    alert(JSON.parse(err).message);
                }catch(e){
                    alert("Ein unbekannter Fehler ist aufgetreten.")
                }

            })
    },

    render () {
        return (
            <div className="login">
                <div className="login-logo">
                    <img className="pulse animated" src="/assets/public/logo-complete-square-dark.png" />
                </div>
                <div className="register-form">
                    <Tabs tabItemContainerStyle={{backgroundColor:"black"}}>
                        <Tab label="Registrieren">
                            <form onSubmit= {this.register}>
                                <div className="text-field"><TextField floatingLabelText="Name" value={this.state.name} onChange={this.handleTextfieldChange.bind(this,"name")}/></div>
                                <div className="text-field"><TextField floatingLabelText="E-Mail" value={this.state.email} onChange={this.handleTextfieldChange.bind(this,"email")}/></div>
                                <div className="text-field"><TextField type="password" floatingLabelText="Passwort" value={this.state.pass} onChange={this.handleTextfieldChange.bind(this,"pass")}/></div>
                                <div className="text-field"><TextField floatingLabelText="Wo gehts hin?" value={this.state.location} onChange={this.handleTextfieldChange.bind(this,"location")}/></div>
                                <div className="text-field"><FlatButton type="submit" label="Registrieren" primary={true} /></div>
                            </form>
                        </Tab>
                        <Tab label="Login">
                            <form onSubmit={this.login}>
                                <div className="text-field"><TextField floatingLabelText="E-Mail" value={this.state.email} onChange={this.handleTextfieldChange.bind(this,"email")}/></div>
                                <div className="text-field"><TextField type="password" floatingLabelText="Passwort" value={this.state.pass} onChange={this.handleTextfieldChange.bind(this,"pass")}/></div>
                                <div className="text-field">
                                    <FlatButton type="submit" label="Login" primary={true} />
                                    <a className="forgot-pass" onClick={this.forgotPassPhrase}>Passwort vergessen?</a>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                    <Snackbar ref="snackbarSuccess" message="Eine Email zum Zurücksetzen wurde versandt!" />
                    <Snackbar ref="snackbarError" message="Ein Fehler ist aufgetreten! Eingaben überprüfen" />
                </div>

            </div>

        );
    }

});


module.exports = Login;