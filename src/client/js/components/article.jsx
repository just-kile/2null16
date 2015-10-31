var React = require("react");
var {getJSON} = require("../services/ajaxService.jsx");
var Checkbox = require("material-ui/lib/checkbox");
var Article = React.createClass({

    render () {
        return (
            <div>
                <Checkbox
                    name="checkboxName1"
                    value="checkboxValue1"
                    label="went for a run today"/>
            </div>
        );
    }
});

module.exports = Article;