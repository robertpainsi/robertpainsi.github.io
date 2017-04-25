"use strict";

var webcomponentsUtils = {
    importScope: function(callback) {
        callback(document._currentScript.ownerDocument);
    },
    registerElement: function(tagName, registerCallbacks) {
        var proto = Object.create(HTMLElement.prototype);
        registerCallbacks.call(proto);
        document.registerElement(tagName, {prototype: proto});
    },
    addTemplate: function(element, template) {
        element.appendChild(webcomponentsUtils.cloneTemplate(template));
        return element.lastElementChild;
    },
    cloneTemplate: function(template) {
        return document.importNode(template.content, true);
    },
    appendChildren: function(children, newParent) {
        for (var i = 0; i < children.length; i++) {
            newParent.appendChild(children[i]);
        }
    },
    prependChildren: function(children, newParent) {
        for (var i = children.length - 1; i >= 0; i--) {
            newParent.insertBefore(children[i], newParent.firstElementChild);
        }
    },
    /**
     *
     * @param from, either HTMLElement or an Array of Attributes
     * @param to, either HTMLElement or an Array of HTMLElement
     */
    passAllAttributes: function(from, to) {
        if (to.constructor === HTMLCollection) {
            for (var i = 0; i < to.length; i++) {
                webcomponentsUtils.passAllAttributes(from, to[i]);
            }
        } else {
            for (var i = 0; i < from.attributes.length; i++) {
                var attribute = from.attributes[i];
                to.setAttribute(attribute.name, attribute.value);
            }
        }
    }
};

var htmlUtils = {
    escapeHtml: function(htmlString) {
        return htmlString
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },
    getAttributeValue: function(e, attribute) {
        var attr = e.attributes.getNamedItem(attribute);
        if (attr) {
            return attr.value;
        }
        return undefined;
    },
    scrollTo: function(id) {
        if (!arguments.length) {
            id = location.hash.substring(location.hash.indexOf('#') + 1);
        }
        if (typeof id === 'string') {
            id = document.getElementById(id);
        }

        if (id) {
            id.scrollIntoView(true);
        }
    },
    toElement: function(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.firstChild;
    },
    clear: function(e) {
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }
    },
    removeClassFromElements: function(clazz) {
        var elements = document.getElementsByClassName(clazz);
        while (elements.length) {
            elements[0].classList.remove(clazz);
        }
    },
    getParameterByName: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};

var mathUtils = {
    trimToRange: function(value, from, to) {
        if (value < from) {
            return from;
        } else if (value > to) {
            return to;
        } else {
            return value;
        }
    },
    toRadians: function(degree) {
        return degree * (Math.PI / 180);
    },
    toDegrees: function(radians) {
        return radians * (180 / Math.PI);
    },
    distance: function(x1, y1, x2, y2) {
        x2 = x2 || 0;
        y2 = y2 || 0;
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
};

var colorUtils = {
    hexToRGB: function(hex) {
        if (typeof hex === 'string') {
            hex = hex.replace('#', '');
        }
        hex = parseInt(hex, 16);
        var r = hex >> 16;
        var g = hex >> 8 & 0xFF;
        var b = hex & 0xFF;
        return {r: r, g: g, b: b};
    },
    hexToRGBA: function(hex, a) {
        var rgb = colorUtils.hexToRGB(hex);
        rgb.a = a;
        return rgb;
    },
    rgbToHex: function(rgb, addLeadingHash) {
        var r = 0;
        var g = 0;
        var b = 0;
        if (arguments.length < 3) {
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;
        } else {
            r = arguments[0];
            g = arguments[1];
            b = arguments[2];
        }

        r = numberUtils.pad(mathUtils.trimToRange(r, 0, 255).toString(16), 2);
        g = numberUtils.pad(mathUtils.trimToRange(g, 0, 255).toString(16), 2);
        b = numberUtils.pad(mathUtils.trimToRange(b, 0, 255).toString(16), 2);

        return ((addLeadingHash) ? '#' : '') + r + g + b;
    },
    rgba: function(rgba) {
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        if (arguments.length === 1) {
            r = rgba.r;
            g = rgba.g;
            b = rgba.b;
            a = rgba.a;
        } else {
            r = arguments[0];
            g = arguments[1];
            b = arguments[2];
            a = arguments[3];
        }
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    },
    increaseBrightnessColor: function(hex, by) {
        var c = colorUtils.hexToRGB(hex);
        c.r += by;
        c.g += by;
        c.b += by;
        return colorUtils.rgbToHex(c, true);
    }
};

var numberUtils = {
    pad: function(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }
};
