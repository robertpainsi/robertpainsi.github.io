"use strict";

var charts = [];
function createChart(element, options) {
    var chart = new Chart(element, options);
    charts.push(chart);
    return chart;
}

var sliders = [];
function createSlider(element, options) {
    var slider = new Slider(element, options);
    sliders.push(slider);
    return (slider);
}

var menu = {
    menus: [],
    show: function(id) {
        var menu = this.menus.find(function(menu) {
            return menu.id === id;
        });
        var content = document.querySelector(menu.htmlLinkId).import;
        $('#content').html(content.querySelector('.page').cloneNode(true));
        charts.forEach(function(chart) {
            chart.destroy();
        });
        charts = [];
        sliders.forEach(function(slider) {
            slider.destroy();
        });
        sliders = [];
        menu.show();
    },
    registerMenu: function(label, htmlLinkId, onShow) {
        this.menus.push({
            id: label.toLowerCase().replace(/ /g, '-'),
            htmlLinkId: htmlLinkId,
            label: label,
            show: onShow
        });
    }
};
