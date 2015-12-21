var React = require("react");
var _ = require("lodash");

function calcCssUrl(url){
      return "url("+url + ")";
}
function loadImage(){
    if(!this.isMounted())return;
    if(this.image)return;
    this.image = new Image();

    this.image.onload = function(){
        this.image = null;
        this.setState({url:this.props.image.url});
    }.bind(this);
    this.image.src = this.props.image.url;

}
var ImgPreload = React.createClass({
    getInitialState: function() {
        return {url:this.props.image.preview ||this.props.image.url };
    },
    componentWillReceiveProps:loadImage,
    componentDidMount:loadImage,
    render (){
        var imgStyle = _.extend({},styles.img,{backgroundImage:calcCssUrl(this.state.url)});
        return (
            <div className="n16-article-img" style={imgStyle}/>
        );
    }
});

var styles = {
    img:{


    }
};
module.exports =ImgPreload;