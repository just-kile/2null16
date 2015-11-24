var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var Remarkable = require("react-remarkable");

var Dashboard = React.createClass({
    getInitialState(){
        return {text: ""};
    },
    handleTextfieldChange(key,event){
        var state = {};
        state[key] = event.target.value;
        this.setState(state);
    },
    render () {
        return (
            <div className="admin-col-wrapper">
                <div className="admin-col text">
                    <textarea onChange={this.handleTextfieldChange.bind(this,"text")}/>
                </div>
                <div className="admin-col images" >

                </div>
                <div className="admin-col preview">
                    <Remarkable>
                        {this.state.text}
                    </Remarkable>
                </div>
            </div>
        );
    }
});


module.exports = Dashboard;