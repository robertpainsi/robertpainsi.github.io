"use strict";

var CHART_COLORS = [
    '#1f8dd6',
    '#ff3333',
    '#3fca3f',
    '#ff973b',
    '#7e649a',
    '#bb6434',
    '#a6cee3',
    '#fb9a99',
    '#b2df8a',
    '#fdbf6f',
    '#cab2d6',
    '#ffff99'
];

function sortData(data, sortFunction) {
    data = data.slice();
    if (data[data.length - 1].isOthers) {
        var others = data.pop();
    }
    if (typeof sortFunction === "function") {
        data.sort(sortFunction);
    } else {
        data.sort(function(a, b) {
            return b.value - a.value;
        });
    }
    if (others) {
        data.push(others);
    }
    return data;
}

function getDataByLabel(data, label) {
    var result = null;
    data.some(function(d) {
        if (d.label === label) {
            result = d;
            return true;
        }
    });
    return result;
}

function topOccurrences(data, top, options) {
    var other = 0;
    var result = data.slice().sort(function(a, b) {
        return b.value - a.value;
    }).filter(function(e, i, a) {
        if (i < top - 1 || e.value === a[top - 1].value) {
            return true;
        } else {
            other += e.value;
            return false;
        }
    });
    if (options.others && other > 0) {
        result.push({
            isOthers: true,
            label: 'Other',
            value: other,
            color: '#eaeaea'
        });
    }
    return result;
}

function toDiffHtml(value, previousValue, options) {
    if (isNumber(value)) {
        options = options || {};
        var diff = toDiffNumber(value, previousValue);

        var diffClass;
        if (diff === 'discontinued' || diff === 'out') {
            diffClass = 'diff diff-less';
        } else if (diff === 'new') {
            diffClass = 'diff diff-greater';
        } else if (diff < 0) {
            diffClass = 'diff diff-less';
        } else if (diff > 0) {
            diffClass = 'diff diff-greater';
        } else {
            diffClass = 'diff diff-equals';
        }
        return '<span class="' + diffClass + '" style="' + options.style + '">' + toDiffText(value, previousValue) + '</span>';
    } else {
        return '';
    }
}

function toDiffText(value, previousValue) {
    if (isNumber(value)) {
        var diff = toDiffNumber(value, previousValue);
        var prefix = '';
        if (diff > 0) {
            prefix = '+';
        }

        if (isNumber(diff)) {
            return prefix + diff.toFixed(2) + '%';
        } else {
            return prefix + diff;
        }
    } else {
        return '';
    }
}

function toDiffNumber(value, previousValue) {
    if (isNumber(value) && isNumber(previousValue)) {
        if (previousValue === 0) {
            return 'new';
        } else {
            return (value - previousValue) * 100 / previousValue;
        }
    } else if (!isNumber(value) && isNumber(previousValue)) {
        return 'discontinued';
    } else if (isNumber(value) && !isNumber(previousValue)) {
        return 'new';
    } else {
        return 'out';
    }
}

function objectToArray(o) {
    if (!o) {
        return null
    }
    return Object.keys(o).map(function(key) {
        return {
            label: key,
            value: o[key]
        };
    });
}

var chartContainer = [];
function createChart(e, options) {
    var chart = new Chart(e, options);
    chartContainer.push(chart);
    chart.generateLegend();
    return chart;
}

function destroyChart(chart) {
    chartContainer.splice(chartContainer.indexOf(chart), 1);
    chart.destroy();
}

function destroyCharts() {
    chartContainer.forEach(function(chart) {
        destroyChart(chart);
    });
}

window.addEventListener('resize', function() {
    chartContainer.forEach(function(c) {
        var chartjsIFrame = c.chart.canvas.parentElement.querySelector('.chartjs-hidden-iframe');
        var newChartWidth = chartjsIFrame.clientWidth;
        document.getElementById('new-and-remixed-programs-chart').style.width = newChartWidth - 24 + 'px';
    })
});
