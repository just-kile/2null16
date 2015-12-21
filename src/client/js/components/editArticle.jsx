var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON,saveArticle,uploadImage} = require("../services/ajaxService.jsx");
var {receivedArticle,receiveArticleStart,activateAjax,getImages,getImagesStart} = require("./../actions/actions.jsx");

var { connect } =require('react-redux');
var {changeDashboardTextarea,changeDashboardMeta} = require("./../actions/actions.jsx");
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
    RefreshIndicator,
    Snackbar,
    StarBorder} = require("material-ui");
var Remarkable = require("react-remarkable");
var ArticleView = require("./articleView.jsx");
var _ = require("lodash");
var Dropzone = require('react-dropzone');
function saveEvent(){
    document.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField(e) {
        var keyCode = e.keyCode;
        if(keyCode==13) {
            alert("You hit the enter key.");
        } else {
            alert("Oh no you didn't.");
        }
    }
}

var Dashboard = React.createClass({
    componentDidMount(){
        document.addEventListener("keypress", this.handleGlobalSave, false);
        const {dispatch} = this.props;
        if(!this.props.activateAjax){
            dispatch(activateAjax());
            return;
        }
        dispatch(receiveArticleStart());
        getJSON("/api/articles/"+this.props.params.articleId).then(function(article){
            dispatch(receivedArticle(article));
        });
        dispatch(getImagesStart());
        getJSON("/api/images").then(function(images){
            dispatch(getImages(images));
        });


    },
    componentWillUnmount(){
        document.removeEventListener("keypress", this.handleGlobalSave, false);
        const {dispatch} = this.props;
        dispatch(receiveArticleStart());
        dispatch(getImagesStart());

    },
    handleGlobalSave(e){

        var keyCode = e.keyCode;
        if(keyCode==19 && e.ctrlKey) {
            e.preventDefault()
            this.handleSave()
        }
    },
    handleTextfieldChange(property,event){
        var {dispatch} = this.props;
        var obj = {};
        obj[property] = event.target.value;
        dispatch(changeDashboardTextarea(obj))

    },
    handleMetaTextfieldChange(property,event){
        var {dispatch} = this.props;
        var obj = {};
        obj[property] = event.target.value;
        dispatch(changeDashboardMeta(obj))
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
    backToAdmin(){
      this.props.history.replaceState(null,"/admin");
    },
    onDrop(files){
        console.log('Received files: ', files);
        var {dispatch} = this.props;
        uploadImage(files,function(){
            dispatch(getImagesStart());
            getJSON("/api/images").then(function(images){
                dispatch(getImages(images));
            });
            console.log('fertig');
        },function(){
            alert("Fehler beim hochladen!");
        });
    },
    render () {
        var {images}  = this.props;
        if(!this.props.article){
            return (<div className="loadingIndicator"><RefreshIndicator size={40} left={0} top={0} status="loading" /></div>);
        }
        return (
            <div className="admin-col-wrapper">
                <div className="admin-col images" >
                    <Dropzone onDrop={this.onDrop}>
                        <div>Bild hochladen</div>
                    </Dropzone>
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
                        <div>Author</div>
                        <input type="text" value={this.props.article.meta.author} onChange={this.handleMetaTextfieldChange.bind(this,"author")}/>
                    </label>
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
                    <FlatButton type="button" label="Zurück Zur Übersicht" onClick={this.backToAdmin}/>
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
        images:state.images || [],
        activateAjax: state.activateAjax
    };
})(Dashboard);