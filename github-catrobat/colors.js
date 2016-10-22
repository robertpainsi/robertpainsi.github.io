"use strict";

var colors = (function() {
    var red = rgba(220, 0, 0, 0.4);
    var green = rgba(0, 220, 0, 0.4);
    var blue = rgba(0, 0, 220, 0.4);
    var orange = rgba(220, 110, 0, 0.4);
    var violet = rgba(150, 0, 220, 0.4);

    return {
        red: red,
        green: green,
        blue: blue,
        skyBlue: rgba(129, 191, 220, 0.8),
        orange: orange,
        violet: violet,

        all: blue,
        merges: green,
        rejects: red,

        addition: green,
        deletion: red
    };
}());
