"use strict";

var URLS = (function() {
    var BASE = 'https://raw.githubusercontent.com/robertpainsi/robertpainsi.github.data/master/';
    if (location.hostname === 'robertpainsi.localhost.io') {
        BASE = 'http://localhost/robertpainsi.github.data/';
    }

    return {
        BASE: BASE,
        PROGRAM_STATISTICS: BASE + 'catrobat/statistics/statistics.json'
    };
}());
