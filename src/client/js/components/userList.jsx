var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {getUsersStart,getUsers,activateAjax} = require("./../actions/actions.jsx");
var {RefreshIndicator,List,ListDivider,ListItem,Avatar,Toggle,IconButton} = require("material-ui");
var Article = React.createClass({
    componentDidMount(){
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
    handleToggle(event,checked){
      console.log(event,checked);
    },
    render () {
        const {users,articles} = this.props;
        if(!users || !articles){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (

            <div>
            <div className="articles">
                <table className="articles" styles={styles.list}>
                    <thead><tr><td>Nummer</td><td>Name</td><td>Email</td></tr></thead>
                    <tbody>
                    {
                        this.props.users.map(function (user,index) {
                            return (<tr styles={styles.listItem} key={user._id}><td>{index+1}.</td><td>{user.name}</td><td>{user.email}</td></tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className="sidebar">
                <List subheader="Artikel verwalten">
                {articles.map(function(article){
                    return (
                        <ListItem
                            style={{backgroundColor:"grey"}}
                            key={"admin_"+article._id}
                            leftAvatar={<Avatar src={article.article.titlePicture.url} />}
                            //rightIconButton={rightIconMenu}
                            primaryText={article.article.title}
                            rightToggle={<Toggle defaultToggled={article.meta.active} onToggle={this.handleToggle} />}
                            secondaryText={
                              <p>
                                <Link to={"/admin/edit/"+article._id}><IconButton iconClassName="material-icons" tooltip="Edit">edit</IconButton></Link>
                              </p>
                            }
                            secondaryTextLines={2} />)
                }.bind(this))}
                </List>
            </div>
            </div>
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
        articles:state.articles,
        activateAjax: state.activateAjax,
    };
})(Article);