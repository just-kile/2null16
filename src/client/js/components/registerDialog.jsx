var React = require("react");
var {getJSON,registerForEvent} = require("../services/ajaxService.jsx");
var { connect } =require('react-redux');
var {getRegistrationCount,getRegistrationCountStart,activateAjax,getUser,getUserStart,getConfig,getConfigStart} = require("./../actions/actions.jsx");
var {RefreshIndicator,RaisedButton,Dialog,Badge,Checkbox,List,ListItem,Avatar} = require("material-ui");
var _ = require("lodash");
var SLOT_SIZE = {
  SLOT_1: 34,
  SLOT_2: 40,
  SLOT_3: Infinity
};
var RegisterDialog = React.createClass({
  getInitialState(){
    return {open: false, user: null,wholeWeek:true};
  },
  handleOpen()  {
    this.setState({open: true});
  },

  handleClose () {
    this.setState({open: false});
  },
  handleChange(){

  },
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getRegistrationCountStart());
    getJSON("/api/registrationCount").then(function (count) {
      dispatch(getRegistrationCount(count.registrationCount));
    });
    dispatch(getUserStart());

    getJSON("/api/user").then(function(users){
      dispatch(getUser(users));
    });
    getConfigStart()
    getJSON("/api/config").then(function(config){
      dispatch(getConfig(config));
    });


  },
  register(){
    registerForEvent(this.state.wholeWeek,function(){
      this.handleClose();
      const {dispatch} = this.props;
      dispatch(getRegistrationCountStart());
      getJSON("/api/registrationCount").then(function (count) {
        dispatch(getRegistrationCount(count.registrationCount));
      });

      dispatch(getUserStart());
      getJSON("/api/user").then(function(users){
        dispatch(getUser(users));
      });
    }.bind(this),function(error){
      alert("Es ist ein Fehler aufgetreten: "+ error)
    });
  },
  check(){
    this.setState({wholeWeek:!this.state.wholeWeek});
  },
  render () {
    const actions = [
      <RaisedButton
        label="Anmelden"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.register}
        />
    ];
    const countOfRegistrations =this.props.registrationCount;
    const slot1 = Math.max(SLOT_SIZE.SLOT_1 - countOfRegistrations, 0);
    const slot2 = Math.max(SLOT_SIZE.SLOT_2 - countOfRegistrations, 0);
    const activeSlot = slot2 > 0 ? (slot1 > 0 ? "slot1" : "slot2") : "slot3";
    const isRegistered = _.has(this,"props.user.registration");
    return (
      <div>
        {_.get(this.props,"config.registration") && <RaisedButton type="button" label={isRegistered?"Du bist angemeldet!":"Verbindlich anmelden!"} primary={true} onClick={this.handleOpen} disabled={isRegistered}/>}

        <Dialog
          title="Verbindlich bei 2null16 anmelden"
          contentStyle={styles.listItem}
          bodyStyle={styles.listItem}
          actionsContainerStyle={styles.listItem}
          titleStyle={styles.listItem}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <Checkbox
            label="Ich bin mindestens 5 Tage dabei."
            defaultChecked={true}
            onCheck={this.check}
            labelStyle={styles.checkbox}
            style={styles.checkboxMargin}
            />
          <List>
            <ListItem style={activeSlot==="slot1"?styles.listItem:styles.listItemDisabled}
                      primaryText="Slot 1: Bett garantiert"
                      disabled={true}
                      rightAvatar={
                      <Avatar
                          color="#F6D919"
              backgroundColor="#F4008C"
              >
              {slot1}
            </Avatar>}/>
            <ListItem style={activeSlot==="slot2"?styles.listItem:styles.listItemDisabled}
                      primaryText="Slot 2: Mitfahrt garantiert" disabled={true}
                      rightAvatar={activeSlot!=="slot1" ?
                      <Avatar
                          color="#F6D919"
              backgroundColor="#F4008C"
              >
              {slot2}
            </Avatar>:<span/>}/>
            <ListItem style={activeSlot==="slot3"?styles.listItem:styles.listItemDisabled}
                      primaryText="Slot 3: Warteliste" disabled={true}
                      rightAvatar={activeSlot==="slot3" ?
                      <Avatar
                          color="#F6D919"
              backgroundColor="#F4008C"
              >
              ??
            </Avatar>:<span/>}/>
          </List>

          <p style={styles.disclaimer}>
            Disclaimer: Mit Klick auf Anmelden meldest du dich verbindlich für 2null16 an.
            Es stehen drei Slots zur Verfügung. Der erste garantiert dir ein Bett, der zweite garantiert dir die
            Mitfahrt.
            Bist du im dritten Slot gelangst du auf die Warteliste, wobei gilt: First come, first serve!
            Wenn du nicht mindestens 5 Tage dabei bist, wirst du kein zugesichertes Bett bekommen.
            Melde dich bitte trotzdem an, damit wir einen besseren Überblick bekommen.
            Bitte sagt uns bescheid, mit wem du ein Zimmer teilen willst.
            Pärchen melden sich bitte separat an.
          </p>
        </Dialog>
      </div>
    );
  }
});
const styles = {
  disclaimer: {
    fontSize: "14px",

  },
  checkboxMargin: {
    marginBottom: 16,

  },
  checkbox: {
    textColor: "black",
    color: "black",
  },
  list: {
    backgroundColor: "black"
  },
  listItem: {
    textColor: "black",
    color: "black"

  },
  listItemDisabled: {
    textColor: "grey",
    color: "grey"

  },
  date: {
    backgroundColor: "black",
    color: "black"

  }
};

module.exports = connect(function (state) {
  return {
    user:state.user,
    config:state.config,
    registrationCount:state.registrationCount
  };
})(RegisterDialog);