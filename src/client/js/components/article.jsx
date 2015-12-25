var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {receivedArticle,receiveArticleStart,activateAjax} = require("./../actions/actions.jsx");
var {RefreshIndicator} = require("material-ui");
var {CardHeader,Avatar,Card,CardText,CardMedia,CardTitle} = require("material-ui");
var Remarkable = require("react-remarkable");
var ArticleView = require("./articleView.jsx");
var Comments = require("./comments.jsx");
var remarkableOptions = {
    linkify:true,
    html:true,
    breaks:true
};

var moment =require("moment");
function formatDate(date){
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
}
function calcTimeToRead(text){
    var CHARS_PER_MIN =750;
    return Math.round(text.length/CHARS_PER_MIN)||1;
}
var Article = React.createClass({
    componentDidMount(){
      const {dispatch} = this.props;
      if(!this.props.activateAjax){
        dispatch(activateAjax());
        return;
      }
      dispatch(receiveArticleStart());
      getJSON("/api/articles/"+this.props.params.articleId).then(function(article){
          dispatch(receivedArticle(article));
      });
    },
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(receiveArticleStart());
    },
    render () {
        const { article } = this.props;
        if(!article){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (
            <div className="n16-article">
                <ArticleView article={this.props.article} />
                <Comments />
            </div>
        );
    }
});
var styles = {
    card: {
        backgroundColor: "black"
    },
    cardHeader: {
        color:"rgba(255,255,255,0.6)"
    },
    sidebarItem:{
        backgroundColor:"#000"
    },
    cardText:{
        fontSize:"18px"
    },
    cardTitle:{
        fontSize:"30px",
        color:"white"
    }

};

module.exports = connect(function(state){
    return {
        article:state.article,
        activateAjax: state.activateAjax
    };
})(Article);