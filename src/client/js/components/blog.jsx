var React = require("react");
var {receivedArticleList,receiveArticleListStart,activateAjax} = require("./../actions/actions.jsx");
var {getJSON} = require("../services/ajaxService.jsx");
var {Card,CardHeader,
    CardMedia,
    CardActions,
    FlatButton,
    CardText,
    Avatar,
    List,
    IconButton,
    ListItem,
    CardTitle,
    RefreshIndicator} = require("material-ui");
var { connect } =require('react-redux');
var {Link} = require("react-router");
var ImgPreload = require("./imgpreload.jsx");
var SideBar = require("./sidebar.jsx");
var moment = require("moment");
var Remarkable = require("react-remarkable");
var remarkableOptions = {
    linkify:true,
    html:true,
    breaks:true
};

function formatDate(date){
    return moment(new Date(date)).format('DD. MM. YYYY')
}
function calcTimeToRead(text){
    var CHARS_PER_MIN =750;
    return Math.round(text.length/CHARS_PER_MIN)||1;
}
var Blog = React.createClass({
    componentDidMount(){
        const {dispatch} = this.props;
        if(!this.props.activateAjax){
            dispatch(activateAjax());
            return;
        }
        dispatch(receiveArticleListStart());
        getJSON("/api/articles").then(function(articles){
            dispatch(receivedArticleList(articles));
        });
    },
    componentWillUnmount(){
        const {dispatch} = this.props;
        dispatch(receiveArticleListStart());
    },
    render () {
        const {articles} = this.props;
        if(!articles){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (
            <div>
            <div className="articles">
                {articles.map(function(article){
                  return <div key={article._id}>
                    <Link to={"/blog/"+article._id}>
                            <Card style={styles.card}>
                                <CardHeader
                                    title={<strong>{article.meta.author}</strong>}
                                    subtitle={<span>erstellt am {formatDate(article.meta.createdAt)} - {calcTimeToRead(article.article.text)}min Lesezeit</span>}
                                    avatar={<Avatar>{article.meta.author.substring(0,1)}</Avatar>}
                                    titleColor={styles.cardHeader.color}
                                    subtitleColor={styles.cardHeader.color}
                                    />
                                <CardMedia overlay={<CardTitle title={article.article.title} subtitle={article.article.subtitle}/>}>
                                    <ImgPreload image={article.article.titlePicture}/>
                                </CardMedia>
                                <CardText style={styles.comments}>
                                    <span className="material-icons" style={styles.commentsIcon}>chat_bubble_outline </span>
                                    <span style={styles.commentsText}>3 Kommentare</span>
                                </CardText>

                            </Card>
                        </Link>
                      <hr/>
                    </div>
                })}


            </div>
                <div className="sidebar">
                    <SideBar />

                </div>
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
    comments:{
        textAlign:"right",
        paddingBottom:"0"
    },
    commentsIcon:{
        fontSize:"14px",
        marginRight:"5px",
        verticalAlign:"middle"
    },
    commentsText:{
        verticalAlign:"middle"
    }

};

module.exports = connect(function(state){
    return {
        articles:state.articles,
        activateAjax: state.activateAjax
    };
})(Blog);