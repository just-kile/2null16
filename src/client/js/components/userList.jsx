var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON,toggleArticle,toggleUserRole,createArticle} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {getUsersStart,getUsers,activateAjax} = require("./../actions/actions.jsx");
var {RefreshIndicator,List,ListDivider,ListItem,Avatar,Toggle,IconButton,FlatButton} = require("material-ui");
var _ = require("lodash");
var Table = require('material-ui/lib/table/table');
var TableBody = require('material-ui/lib/table/table-body');
var TableFooter = require('material-ui/lib/table/table-footer');
var TableHeader = require('material-ui/lib/table/table-header');
var TableHeaderColumn = require('material-ui/lib/table/table-header-column');
var TableRow = require('material-ui/lib/table/table-row');
var TableRowColumn = require('material-ui/lib/table/table-row-column');
var {receivedArticleList,receiveArticleListStart} = require("./../actions/actions.jsx");
var Toggle = require('material-ui/lib/toggle');

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
        dispatch(receiveArticleListStart());
        getJSON("/api/articles?allArticles=true").then(function(articles){
            dispatch(receivedArticleList(articles));
        });
    },
    handleToggle(articleId,event,checked){
      console.log(event,checked);
        toggleArticle(articleId,checked)
    },
    handleAdmin(accountId,event,checked){
      toggleUserRole(accountId,checked?"ADMIN" :"USER");
    },
    createNewArticle(){
        createArticle(function(result){
            var id = _.get(result,"result.upserted[0]._id");
            this.props.history.replaceState(null,"/admin/edit/"+id);
        }.bind(this))

    },
    render () {
        const {users,articles} = this.props;
        if(!users || !articles){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (

            <div>
            <div className="articles">
                <Table selectable={false}>
                    <TableHeader><TableRow><TableHeaderColumn>Name</TableHeaderColumn><TableHeaderColumn>Email</TableHeaderColumn><TableHeaderColumn>Is Admin</TableHeaderColumn></TableRow></TableHeader>
                    <TableBody style={styles.list}>
                    {
                        this.props.users.map(function (user,index) {
                            return (
                            <TableRow styles={styles.listItem} key={user._id}>
                                <TableRowColumn styles={styles.listItem}>{user.name}</TableRowColumn>
                                <TableRowColumn styles={styles.listItem}>{user.email}</TableRowColumn>
                                <TableRowColumn styles={styles.listItem}><Toggle defaultToggled={user.role==="ADMIN"} onToggle={this.handleAdmin.bind(this,user._id)}/></TableRowColumn>
                            </TableRow>)
                        }.bind(this))
                    }
                    </TableBody>
                </Table>
            </div>
            <div className="sidebar">
                <FlatButton type="button" label="Artikel erstellen" primary={true} onClick={this.createNewArticle} />
                <List subheader="Artikel verwalten">
                {articles.map(function(article){
                    return (
                        <ListItem
                            style={{backgroundColor:"grey"}}
                            key={"admin_"+article._id}
                            leftAvatar={<Avatar src={article.article.titlePicture.url} />}
                            //rightIconButton={rightIconMenu}
                            primaryText={article.article.title}
                            rightToggle={<Toggle defaultToggled={article.meta.active} onToggle={this.handleToggle.bind(this,article._id)} />}
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
        textColor:"black",
        backgroundColor:"#999"
    }
}

module.exports = connect(function (state) {
    return {
        users: state.users,
        articles:state.articles,
        activateAjax: state.activateAjax,
    };
})(Article);