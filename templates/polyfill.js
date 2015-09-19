"use strict";

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {

            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

// https://gist.github.com/tuespetre/f91b91bfd4dabab04e57a6db187c0c34
(function() {
    var polyfill = function(prototype) {
        if (!('firstElementChild' in prototype)) {
            Object.defineProperty(prototype, 'firstElementChild', {
                get: function() {
                    var nodes = this.childNodes;
                    var length = nodes.length;
                    var current;
                    for (var i = 0; i < length; i++) {
                        current = nodes[i];
                        if (current.nodeType === 1) {
                            return current;
                        }
                    }
                    return null;
                }
            });
        }

        if (!('lastElementChild' in prototype)) {
            Object.defineProperty(prototype, 'lastElementChild', {
                get: function() {
                    var nodes = this.childNodes;
                    var length = nodes.length;
                    var current;
                    for (var i = length - 1; i > 0; i--) {
                        current = nodes[i];
                        if (current.nodeType === 1) {
                            return current;
                        }
                    }
                    return null;
                }
            });
        }

        if (!('childElementCount' in prototype)) {
            Object.defineProperty(prototype, 'childElementCount', {
                get: function() {
                    var nodes = this.childNodes;
                    var length = nodes.length;
                    var count = 0;
                    for (var i = 0; i < length; i++) {
                        if (nodes[i].nodeType === 1) {
                            count++;
                        }
                    }
                    return count;
                }
            });
        }

        if (!('children' in prototype)) {
            Object.defineProperty(prototype, 'children', {
                get: function() {
                    var nodes = this.childNodes;
                    var length = nodes.length;
                    var children = [];
                    var current;
                    for (var i = 0; i < length; i++) {
                        current = nodes[i];
                        if (current.nodeType === 1) {
                            children.push(current);
                        }
                    }
                    return children;
                }
            });
        }
    };

    [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(polyfill);
})();
