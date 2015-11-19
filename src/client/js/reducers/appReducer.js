var GET_ARTICLE = require("./../actions/actionTypes").GET_ARTICLE;
var GET_ARTICLE_LIST = require("./../actions/actionTypes").GET_ARTICLE_LIST;
module.exports = function(state,action){
    switch(action.type){
        case GET_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        case GET_ARTICLE_LIST:
            return Object.assign({}, state, {
                articles: action.articles.articles
            });
        default:
            return state;
    }
    return state;
};