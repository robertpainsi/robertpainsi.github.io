"use strict";

$.getCachedJSON = (function(json) {
    var c = {};
    return function(file) {
        c[file] = c[file] || new Promise(function(resolve, reject) {
                $.getJSON(file)
                    .done(resolve)
                    .fail(reject);
            });
        return new Promise(function(resolve, reject) {
            c[file].then(function(data) {
                resolve(JSON.parse(JSON.stringify(data)));
            }).catch(reject)
        });
    }
}());
