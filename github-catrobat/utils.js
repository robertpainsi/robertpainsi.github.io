"use strict";

var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

function toPercentLabel(v) {
    return Math.round(v * 100) + '%';
}

function rgba(r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function combineKeys(array) {
    let o = {};
    array.forEach(function(e) {
        Object.getOwnPropertyNames(e).forEach(function(key) {
            o[key] = (o[key] || []);
            o[key].push(e[key]);
        })
    });
    return o;
}

function updateXAxes(chart) {
    return updateAxes(chart, 'xAxes');
}

function updateYAxes(chart) {
    return updateAxes(chart, 'yAxes');
}

function updateAxes(chart, type) {
    var start;
    var end;
    var needsUpdate = true;
    return function(slideEvt) {
        start = slideEvt[0];
        end = slideEvt[1];
        if (needsUpdate) {
            setTimeout(function() {
                var scales = charts[0].options.scales;
                for (var i = 0; i < scales[type].length; i++) {
                    var ticks = charts[0].options.scales[type][i].ticks;
                    ticks.min = start;
                    ticks.max = end;
                }
                chart.update();
                needsUpdate = true;
            }, 60);
            needsUpdate = false;
        }
    }
}

function maxValues(points) {
    return {
        x: maxX(points),
        y: maxY(points)
    };
}

function maxX(points) {
    return points.reduce(function(prev, current) {
        return (prev.x > current.x) ? prev : current
    }).x;
}

function maxY(points) {
    return points.reduce(function(prev, current) {
        return (prev.y > current.y) ? prev : current
    }).y;
}

function addChartTemplate(e) {
    if (!e) {
        e = document.querySelector('.page')
    }
    var chartElement = document.querySelector('#chart-template').firstElementChild.cloneNode(true);
    e.appendChild(chartElement);
    return chartElement;
}