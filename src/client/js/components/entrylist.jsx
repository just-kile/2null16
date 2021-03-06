var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var EntryList = React.createClass({
    statics: {
        fetchData () {
            return getJSON('/api/article/list').then((res) => res.articles);
        }
    },
    renderEntry(article){
        var params = {articleId:article._id};
        return (
            <li key={article.article._id}><Link to="article" params={params}>{article.article.title}</Link></li>
        )
    },

    render () {
        return (
            <div>
                {this.props.articles.map(this.renderEntry)}
            </div>
        );
    }
});


module.exports = EntryList;