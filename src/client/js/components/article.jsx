var React = require("react");
var {getJSON} = require("../services/ajaxService.jsx");
var {Card,CardHeader,
    CardMedia,
    CardActions,
    FlatButton,
    CardText,
    Avatar,
    List,
    ListItem,
    CardTitle} = require("material-ui");

var Article = React.createClass({

    render () {
        return (
            <div>
            <div className="articles">
                <Card style={styles.card}>
                    <CardHeader
                        title={<strong>Winnii</strong>}
                        subtitle="erstellt am 23.11.2015 - 4min Lesezeit"
                        avatar={<Avatar>W</Avatar>}
                        titleColor={styles.cardHeader.color}
                        subtitleColor={styles.cardHeader.color}
                        />
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
                <hr />
                <Card style={styles.card}>
                    <CardHeader
                        title="Willkommen!"
                        subtitle="erstellt am 23.11.2015 von Winnii"
                        avatar={<Avatar>A</Avatar>}
                        titleColor={styles.cardHeader.color}
                        subtitleColor={styles.cardHeader.color}
                        />
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
            </div>
                <div className="sidebar">
                        <ListItem style={styles.sidebarItem}>
                            <Card style={styles.card}>
                                <CardMedia overlay={<CardTitle title="Zimmmerbelegung bald verfügbar!" />}>
                                    <img src="http://lorempixel.com/600/337/nature/"/>
                                </CardMedia>
                            </Card>
                        </ListItem>

                </div>
            </div>
        );
    }
});
var styles = {
    card: {
        backgroundColor: "black"
    },
    cardHeader: {
        color:"rgba(255,255,255,0.6)"
    },
    sidebarItem:{
        backgroundColor:"#000"
    }

};
module.exports = Article;