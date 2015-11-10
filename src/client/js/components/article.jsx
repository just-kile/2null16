var React = require("react");
var {getJSON} = require("../services/ajaxService.jsx");
var {Card,CardHeader,CardMedia,CardActions,FlatButton,CardText,Avatar,CardTitle} = require("material-ui");
var Article = React.createClass({

    render () {
        return (
            <Card style={styles.card}>
                <CardHeader
                    title="Willkommen!"
                    subtitle="erstellt am 23.11.2015 von Winnii"
                    avatar={<Avatar>A</Avatar>}
                    style={styles.cardHeader}/>
                <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
                    <img src="http://lorempixel.com/600/337/nature/"/>
                </CardMedia>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>

            </Card>
        );
    }
});
var styles = {
    card: {
        backgroundColor: "black"
    },
    cardHeader: {
        color:"white!important",
        textColor:"white",
        titleColor:"white",
    }

};
module.exports = Article;