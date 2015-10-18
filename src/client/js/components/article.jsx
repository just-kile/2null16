var React = require("react");
var Router = require("react-router");
var {getJSON} = require("../services/ajaxService.jsx");

var Article = React.createClass({
    statics: {
        fetchData (params) {
            return getJSON('/api/article/'+params.articleId).then((res) => res.article);
        }
    },
    render () {
        return (
            <div>
                <Article.Title title={this.props.article.article.title}></Article.Title>
                <Article.Text {...this.props.article}></Article.Text>
            </div>
        );
    }
});
Article.Title = React.createClass({
    render () {
        return (
            <h1>{this.props.title}</h1>
        );
    }
});
Article.Text = React.createClass({
    render () {
        return (
            <div>{this.props.article.description}</div>
        );
    }
});



module.exports = Article;