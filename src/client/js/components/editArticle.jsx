var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
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
    StarBorder} = require("material-ui");
var Remarkable = require("react-remarkable");
var ArticleView = require("./articleView.jsx");
var _ = require("lodash");


var Dashboard = React.createClass({
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
                </div>

                <div className="admin-col preview">
                    <ArticleView article={this.props.article} />
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