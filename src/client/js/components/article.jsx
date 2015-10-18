var React = require("react");
var Router = require("react-router");
var {getJSON} = require("../services/ajaxService.jsx");
var Checkbox = require("material-ui/lib/checkbox");
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
                <Checkbox
                    name="checkboxName1"
                    value="checkboxValue1"
                    label="went for a run today"/>
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