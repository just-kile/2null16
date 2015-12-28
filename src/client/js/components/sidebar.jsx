var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var {CardHeader,Avatar,Card,CardText,CardMedia,CardTitle,ListItem,List,IconButton} = require("material-ui");
var _ = require("lodash");
var LIST_ICON = "done"
var SideBar = React.createClass({
    render () {
        return (
            <List style={styles.list}>
                <ListItem style={styles.sidebarItem} href="http://www.herrenhaus-luebbenow.de/index.php" target="_blank">
                    <Card style={styles.card}>
                        <CardMedia overlay={<CardTitle title="Das Herrenhaus in Lübbenow" />}>
                            <img src="/assets/public/herrenhaus.jpg"/>
                        </CardMedia>
                    </Card>

                </ListItem>
                <List style={styles.list} subheader="Facts" subheaderStyle={styles.subheader}>
                    <ListItem leftIcon={<IconButton iconClassName="material-icons">{LIST_ICON}</IconButton>} style={styles.sidebarItem} primaryText="34 Plätze"/>
                    <ListItem leftIcon={<IconButton iconClassName="material-icons">{LIST_ICON}</IconButton>} style={styles.sidebarItem} primaryText="Turnhalle/Sauna/Schwimmhalle"/>
                    <ListItem style={styles.sidebarItem} primaryText="PAs, Basshörner" leftIcon={<IconButton iconClassName="material-icons">{LIST_ICON}</IconButton>}/>
                    <ListItem style={styles.sidebarItem} primaryText="Shitload an Beleuchtung" leftIcon={<IconButton iconClassName="material-icons">{LIST_ICON}</IconButton>}/>
                    <ListItem style={styles.sidebarItem} primaryText="The B.R.A" leftIcon={<IconButton iconClassName="material-icons">{LIST_ICON}</IconButton>}/>
                </List>
            </List>
        );
    }
});


var styles = {
    card: {
        backgroundColor: "black",
        color:"#fff"
    },
    subheader:{
      color:"white"
    },
    sidebarItem:{
        backgroundColor:"#000"
    },
    list:{
        backgroundColor:"#000"
    }

};

module.exports =SideBar;