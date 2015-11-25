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
        var insertion = "![alt text]("+imgUrl+ ")";

        var newText = this.props.article.article.text.slice(0,selectionStart) + insertion + this.props.article.article.text.slice(selectionStart);
        var {dispatch} = this.props;
        dispatch(changeDashboardTextarea({text:newText}))
    },
    render () {
        return (
            <div className="admin-col-wrapper">
                <div className="admin-col images" >
                    <GridList cellHeight={200}>
                        <GridTile
                            title="Picture"
                            subtitle="Picture"
                            actionIcon={<IconButton iconClassName="material-icons" onClick={this.handleTitleImage.bind(this,"http://material-ui.com/images/grid-list/water-plant-821293_640.jpg")}>star</IconButton>}>
                            <img src="http://material-ui.com/images/grid-list/water-plant-821293_640.jpg" />
                        </GridTile>
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
    };
})(Dashboard);