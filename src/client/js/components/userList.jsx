var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {getUsersStart,getUsers,activateAjax} = require("./../actions/actions.jsx");
var {RefreshIndicator,List,ListDivider,ListItem} = require("material-ui");
var Article = React.createClass({
    componentWillReceiveProps(){
         const {dispatch} = this.props;
        if(!this.props.activateAjax){
            dispatch(activateAjax());
            return;
        }
         dispatch(getUsersStart());
         getJSON("/api/users").then(function(users){
            dispatch(getUsers(users));
         });
    },
    render () {
        const {users} = this.props;
        if(!users){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (
            <table className="articles" styles={styles.list}>
                <thead><tr><td>Name</td><td>Email</td></tr></thead>
                <tbody>
                {
                    this.props.users.map(function (user) {
                        return (<tr styles={styles.listItem} key={user._id}><td>{user.name}</td><td>{user.email}</td></tr>)
                    })
                }
                </tbody>
            </table>

        );
    }
});
const styles = {
    list:{
        backgroundColor:"black"
    },
    listItem:{
        textColor:"black"
    }
}

module.exports = connect(function (state) {
    return {
        users: state.users,
        activateAjax: state.activateAjax,
    };
})(Article);