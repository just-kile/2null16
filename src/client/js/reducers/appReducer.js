var GET_ARTICLE = require("./../actions/actionTypes").GET_ARTICLE;
var GET_ARTICLE_START = require("./../actions/actionTypes").GET_ARTICLE_START;
var GET_ARTICLE_LIST = require("./../actions/actionTypes").GET_ARTICLE_LIST;
var GET_ARTICLE_LIST_START = require("./../actions/actionTypes").GET_ARTICLE_LIST_START;
module.exports = function(state,action){
    switch(action.type){
        case GET_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        case GET_ARTICLE_START:
            return Object.assign({}, state, {
                article: null
            });
        case GET_ARTICLE_LIST:
            return Object.assign({}, state, {
                articles: action.articles.articles
            });
        case GET_ARTICLE_LIST_START:
            return Object.assign({}, state, {
                articles: null
            });
        default:
            return state;
    }
    return state;
};