"use strict";

var URLS = (function() {
    var BASE;
    if (location.hostname === 'robertpainsi.github.io') {
        BASE = 'https://raw.githubusercontent.com/robertpainsi/robertpainsi.github.data/master/';
    } else {
        BASE = '/robertpainsi.github.data/';
    }

    return {
        BASE: BASE,
        PROGRAM_STATISTICS: BASE + 'catrobat/program-statistics.json'
    };
}());
