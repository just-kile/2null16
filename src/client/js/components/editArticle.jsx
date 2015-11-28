var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON,saveArticle} = require("../services/ajaxService.jsx");
var {receivedArticle,receiveArticleStart,activateAjax} = require("./../actions/actions.jsx");

var { connect } =require('react-redux');
var {changeDashboardTextarea} = require("./../actions/actions.jsx");
var {CardHeader,
    Avatar,
    Card,
    CardText,
    CardMedia,
    CardTitle,
    GridList,
    GridTile,
    IconButton,
    FlatButton,
    Snackbar,
    StarBorder} = require("material-ui");
var Remarkable = require("react-remarkable");
var ArticleView = require("./articleView.jsx");
var _ = require("lodash");


var Dashboard = React.createClass({
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
    handleTextfieldChange(property,event){
        var {dispatch} = this.props;
        dispatch(changeDashboardTextarea({[property]:event.target.value}))

    },
    handleTitleImage(imgUrl,event){
        var selectionStart = this.refs.articleText.selectionStart;
        var insertion = "!["+imgUrl.title+"]("+imgUrl.url+ ")";

        var newText = this.props.article.article.text.slice(0,selectionStart) + insertion + this.props.article.article.text.slice(selectionStart);
        var {dispatch} = this.props;
        dispatch(changeDashboardTextarea({text:newText}))
    },
    setTitleImage(titlePicture){
        var {dispatch} = this.props;
        dispatch(changeDashboardTextarea({titlePicture:titlePicture}));
    },
    handleSave(){
        saveArticle(this.props.article, this.refs.saveSuccess.show,this.refs.saveFail.show)
    },
    openPreview(){
        window.open('/blog/'+this.props.article._id, '_blank');
    },
    render () {
        var {images}  = this.props;

        return (
            <div className="admin-col-wrapper">
                <div className="admin-col images" >
                    <GridList cellHeight={100}>
                        {images.map(function(image){
                        return (<GridTile
                            key={image._id}
                            title={image.title}
                            actionIcon={<IconButton iconClassName="material-icons" onClick={this.setTitleImage.bind(this,image)}>star</IconButton>}>
                            <img style={{cursor:"pointer"}} src={image.url} onClick={this.handleTitleImage.bind(this,image)}/>
                            </GridTile>)
                            },this
                        )}

                    </GridList>
                </div>
                <div className="admin-col text">
                    <label>
                        <div>Title</div>
                        <input type="text" value={this.props.article.article.title} onChange={this.handleTextfieldChange.bind(this,"title")}/>
                    </label>
                    <label>
                        <div>Text:</div>
                        <textarea ref="articleText" value={this.props.article.article.text} onChange={this.handleTextfieldChange.bind(this,"text")}/>
                    </label>
                    <FlatButton type="button" label="Speichern" primary={true} onClick={this.handleSave}/>
                    <FlatButton type="button" label="Preview" secondary={true} onClick={this.openPreview}/>
                </div>

                <div className="admin-col preview">
                    <ArticleView article={this.props.article} />
                    <Snackbar ref="saveSuccess" message="Artikel erfolgreich gespeichert" />
                    <Snackbar ref="saveFail" message="Fehler beim Speichern aufgetreten" />

                </div>

            </div>
        );
    }
});

module.exports = connect(function (state) {
    return {
        article: state.article,
        images:state.images || []
    };
})(Dashboard);