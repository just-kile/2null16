var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {RefreshIndicator} = require("material-ui");
var {CardHeader,Avatar,Card,CardText,CardMedia,CardTitle} = require("material-ui");
var Remarkable = require("react-remarkable");
var remarkableOptions = {
    linkify:true,
    html:true,
    breaks:true
};

var moment =require("moment");
function formatDate(date){
    return moment(new Date(date)).format('DD. MM. YYYY')
}
function calcTimeToRead(text){
    var CHARS_PER_MIN =750;
    return Math.round(text.length/CHARS_PER_MIN)||1;
}
var ArticleView = React.createClass({
    render () {
        const { article } = this.props;
        if(!article){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (
            <div className="n16-article">
                <Card style={styles.card}>
                    <CardHeader
                        className="n16-article-text"
                        title={<strong>{this.props.article.meta.author}</strong>}
                        subtitle={<span>erstellt am {formatDate(this.props.article.meta.createdAt)} - {calcTimeToRead(this.props.article.article.text)}min Lesezeit</span>}
                        avatar={<Avatar>{this.props.article.meta.author.substring(0,1)}</Avatar>}
                        titleColor={styles.cardHeader.color}
                        subtitleColor={styles.cardHeader.color}
                        />
                    <CardMedia>
                        <img src="http://lorempixel.com/600/337/nature/"/>
                    </CardMedia>
                    <CardText className="n16-article-text" style={styles.cardText}>
                        <h2 className="n16-article-title">{this.props.article.article.title} </h2>
                        <Remarkable options={remarkableOptions}>
                            {this.props.article.article.text}
                        </Remarkable>
                    </CardText>

                </Card>
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

module.exports =ArticleView;