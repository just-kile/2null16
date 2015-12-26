var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON,addComment} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {RefreshIndicator} = require("material-ui");
var {TextField,FlatButton,Avatar,Card,CardText,CardHeader,CardMedia,CardTitle} = require("material-ui");
var Remarkable = require("react-remarkable");
var _ = require("lodash");
var {changeDashboardMeta} = require("./../actions/actions.jsx");

var Comments = React.createClass({
    getInitialState(){
        return {comment: ''};
    },
    handleCommentChange(key,event){
        var state = {};
        state[key] = event.target.value;
        this.setState(state);
    },
    handleComment(){
        var meta = _.cloneDeep(this.props.article.meta);
        var {dispatch} = this.props;
        addComment(this.props.article._id,this.state.comment,function(commentData){
            if(meta.comments){
                meta.comments.push(commentData);
            }else{
                meta.comments = [commentData];
            }
            dispatch(changeDashboardMeta(meta));
            this.setState({comment:""});
        }.bind(this));
    },
    render () {
        return (
           <div className="n16-comments">
               <hr />
               {this.props.article.meta.comments &&
                   this.props.article.meta.comments.map(function(val,key){
                       return (<Card style={styles.card} key={key}>
                           <CardHeader
                           title={val.userName}
                           subtitle={val.createdAt+""}
                           titleColor={styles.cardHeader.color}
                           subtitleColor={styles.cardHeader.color}
                           avatar={<Avatar>{val.userName.substring(0,1)}</Avatar>}/>
                           <CardText>
                            {val.comment}
                           </CardText>
                       </Card>)

               }.bind(this))

               }
               <TextField
                   hintText="Schreibe eine Antwort..."
                   fullWidth={true}
                   value={this.state.comment} onChange={this.handleCommentChange.bind(this,"comment")}
                   multiLine={true} />
               <FlatButton label="Abschicken" primary={true} onClick={this.handleComment}/>
               ​
            </div>
        );
    }
});
var styles = {
    card: {
        backgroundColor: "black"
    },
    cardHeader:{
        color:"rgba(255,255,255,0.6)"
    }
};

module.exports = connect(function(state){
    return {
        article:state.article
    };
})(Comments);