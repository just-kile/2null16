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
    ListItem,
    CardTitle,
    RefreshIndicator} = require("material-ui");
var { connect } =require('react-redux');
var {Link} = require("react-router");
var moment = require("moment");
function formatDate(date){
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
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
                                    subtitle={<span>erstellt am {formatDate(article.meta.createdAt)} - 4min Lesezeit</span>}
                                    avatar={<Avatar>{article.meta.author.substring(0,1)}</Avatar>}
                                    titleColor={styles.cardHeader.color}
                                    subtitleColor={styles.cardHeader.color}
                                    />
                                <CardMedia overlay={<CardTitle title={article.article.title} subtitle={article.article.subtitle}/>}>
                                    <img src={article.article.titlePicture.url}l/>
                                </CardMedia>
                                <CardText className="articleText">
                                    {article.article.text.substr(0,300).replace(/!\[.+\]\(\/image.+\)/g,"")}...
                                </CardText>

                            </Card>
                        </Link>
                      <hr/>
                    </div>
                })}


            </div>
                <div className="sidebar">
                        <ListItem style={styles.sidebarItem}>
                            <Card style={styles.card}>
                                <CardMedia overlay={<CardTitle title="Zimmmerbelegung bald verfügbar!" />}>
                                    <img src="http://lorempixel.com/600/337/nature/"/>
                                </CardMedia>
                            </Card>
                        </ListItem>

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
    sidebarItem:{
        backgroundColor:"#000"
    }

};

module.exports = connect(function(state){
    return {
        articles:state.articles,
        activateAjax: state.activateAjax
    };
})(Blog);