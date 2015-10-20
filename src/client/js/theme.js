
'use strict';

var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');

var colorsStyleguide = {
    "_lipstick": "#AC0263",
    "_roseCherry": "#F4008C",
    "_ripeLemon": "#F6D919",
    "_bahia": "#95C113",
    "_black": "#000000",
    "_mineShaft": "#1F1F1F",
    "_doveGray": "#505050",
    "_mercury": "#E0E0E0",
    "_white": "#FFFFFF"

};
module.exports = {
    spacing: Spacing,
    fontFamily: 'Dosis, sans-serif',
    palette: {
        primary1Color: colorsStyleguide._roseCherry,
        primary2Color: colorsStyleguide._lipstick,
        primary3Color: Colors.lightBlack,
        accent1Color: colorsStyleguide._ripeLemon,
        accent2Color: colorsStyleguide._bahia,
        accent3Color: Colors.grey500,
        textColor: Colors.fullWhite,
        alternateTextColor: colorsStyleguide._lipstick,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: colorsStyleguide._mercury
    }
};