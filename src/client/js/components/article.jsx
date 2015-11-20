var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {receivedArticle,receiveArticleStart} = require("./../actions/actions.jsx");
var {RefreshIndicator} = require("material-ui");
var Article = React.createClass({
    componentDidMount(){
      const {dispatch} = this.props;
      dispatch(receiveArticleStart());
      getJSON("/api/articles/"+this.props.params.articleId).then(function(article){
          dispatch(receivedArticle(article));
      });
    },
    render () {
        const { article } = this.props;
        if(!article){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>)
        }
        return (
            <div>
                {article.article.text}
            </div>
        );
    }
});


module.exports = connect(function(state){
    return {
        article:state.article
    };
})(Article);