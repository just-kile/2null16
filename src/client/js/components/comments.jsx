var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var {getJSON} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {RefreshIndicator} = require("material-ui");
var {TextField,FlatButton,Avatar,Card,CardText,CardHeader,CardMedia,CardTitle} = require("material-ui");
var Remarkable = require("react-remarkable");
var _ = require("lodash");
var Comments = React.createClass({
    render () {
        return (
           <div className="n16-comments">
               <hr />
               <Card style={styles.card}>
                   <CardHeader
                       title="Peter Müller"
                       subtitle="Vor 4 Tagen"
                       titleColor={styles.cardHeader.color}
                       subtitleColor={styles.cardHeader.color}
                       avatar={<Avatar>A</Avatar>}/>
                   <CardText>
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                       Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                       Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                   </CardText>
               </Card>
               ​ <Card style={styles.card}>
               <CardHeader
                   title="Peter Müller"
                   subtitle="Vor 4 Tagen"
                   titleColor={styles.cardHeader.color}
                   subtitleColor={styles.cardHeader.color}
                   avatar={<Avatar>A</Avatar>}/>
               <CardText>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                   Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                   Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                   Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
               </CardText>
           </Card>
               <TextField
                   hintText="Schreibe eine Antwort..."
                   fullWidth={true}
                   multiLine={true} />
               <FlatButton label="Abschicken" primary={true} />
               ​
            </div>
        );
    }
});
var styles = {
    card: {
        backgroundColor: "black"
    },
    cardHeader:{
        color:"rgba(255,255,255,0.6)"
    }
};

module.exports =Comments;