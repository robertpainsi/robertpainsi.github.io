"use strict";

function createStatistics(updated, timeline, overall, previousOverall) {
    previousOverall = previousOverall || {};

    setLastUpdated($('.last_updated'), stringToDate(updated));

    createOverallStatistics(document.getElementById('quantities'), overall, previousOverall);
    createNewProgramsStatistics(document.getElementById('new-and-remixed-programs-chart'), timeline);

    createPieWithStatistics({
        element: document.getElementById('programs-with-multiple-scenes-pie-chart'),
        data: [{
            label: 'Programs with a single Scene',
            value: overall.programs - overall.programsWithMultipleScenes,
            previousValue: previousOverall.programs - previousOverall.programsWithMultipleScenes
        }, {
            label: 'Programs with multiple Scenes',
            value: overall.programsWithMultipleScenes,
            previousValue: previousOverall.programsWithMultipleScenes
        }],
        sort: true,
        reverseLegend: true,
        createLegend: createPieChartLegendDualValues
    });

    createPieWithStatistics({
        element: document.getElementById('programs-with-groups-pie-chart'),
        data: [{
            label: 'Programs without Groups',
            value: overall.programs - overall.programsWithGroups,
            previousValue: previousOverall.programs - previousOverall.programsWithGroups
        }, {
            label: 'Programs with Groups',
            value: overall.programsWithGroups,
            previousValue: previousOverall.programsWithGroups
        }],
        sort: true,
        reverseLegend: true,
        createLegend: createPieChartLegendDualValues
    });

    createPieWithStatistics({
        element: document.getElementById('landscape-programs-pie-chart'),
        data: [{
            label: 'Programs in portrait',
            value: overall.programs - overall.programsInLandscape,
            previousValue: previousOverall.programs - previousOverall.programsInLandscape
        }, {
            label: 'Programs in landscape',
            value: overall.programsInLandscape,
            previousValue: previousOverall.programsInLandscape
        }],
        sort: true,
        reverseLegend: true,
        createLegend: createPieChartLegendDualValues
    });

    createPieWithStatistics({
        element: document.getElementById('remixed-programs-pie-chart'),
        data: [{
            label: 'New Programs',
            value: overall.programs - overall.remixes,
            previousValue: previousOverall.programs - previousOverall.remixes
        }, {
            label: 'Remixed Programs',
            value: overall.remixes,
            previousValue: previousOverall.remixes
        }],
        sort: true,
        reverseLegend: true,
        createLegend: createPieChartLegendDualValues
    });

    createPieWithStatistics({
        element: document.getElementById('versions-pie-chart'),
        data: highlightLatestLanguage(objectToDataArray(overall.languages, previousOverall.languages)),
        sort: true,
        createLegend: createPieChartLegendVertical
    });

    createPieWithStatistics({
        element: document.getElementById('screen-size-pie-chart'),
        data: topOccurrences(objectToDataArray(overall.screenSizes, previousOverall.screenSizes), 10, {others: true}),
        sort: true,
        createLegend: createPieChartLegendVertical
    });

    createPieWithStatistics({
        element: document.getElementById('platforms-pie-chart'),
        data: topOccurrences(objectToDataArray(overall.platforms, previousOverall.platforms), 10, {others: true}),
        sort: true,
        createLegend: createPieChartLegendVertical
    });

    createEnhancedBlockUsageChart(document.getElementById('brick-usage-chart'), overall.brickUsage, previousOverall.brickUsage);
}

function objectToDataArray(object, previousObject) {
    var currentData = objectToArray(object);
    if (previousObject) {
        var previousData = objectToArray(previousObject);

        currentData.forEach(function(d) {
            var previousD = getDataByLabel(previousData, d.label);
            if (previousD) {
                d.previousValue = previousD.value;
            } else {
                d.previousValue = 0;
            }
        });
    }
    return currentData;
}

function highlightLatestLanguage(languages) {
    var latestLanguage = languages.reduce(function(currentLatestVersion, version) {
        if (parseFloat(currentLatestVersion.label) < parseFloat(version.label)) {
            return version;
        } else {
            return currentLatestVersion;
        }
    }, {label: "0.0"});
    latestLanguage.label = latestLanguage.label + ' (latest)';
    return languages;
}

function setLastUpdated($e, updated) {
    var updatedString = updated.toLocaleDateString();
    $e.each(function() {
        $(this).html(updatedString);
    });
}

function createOverallStatistics(e, overall, previously) {
    previously = previously || {};
    var rows = [
        ['Programs', overall.programs, previously.programs, {relative: false}],
        ['Scenes', overall.scenes, previously.scenes],
        ['Objects', overall.objects, previously.objects],
        ['Groups', overall.groups, previously.groups],
        ['Looks', overall.looks, previously.looks],
        ['Sounds', overall.sounds, previously.sounds],
        ['Bricks', overall.bricks, previously.bricks],
        ['Variables', overall.programVariables + overall.objectVariables, previously.programVariables + previously.objectVariables],
        ['Lists', overall.programLists + overall.objectLists, previously.programLists + previously.objectLists]
    ];
    e.innerHTML = rows.map(function(row) {
        var type = row[0];
        var value = row[1];
        var previousValue = row[2];
        var options = row[3] || {};

        var diff = '';
        if (isNumber(previousValue)) {
            var v = value;
            var p = previousValue;
            if (options.relative !== false) {
                v /= overall.programs;
                p /= previously.programs;
            }
            diff = toDiffHtml(v, p);
        }
        return '<tr><td>' + type + '</td><td class="text-right">' + value + '</td><td class="text-right">' + diff + '</td></tr>';
    }).join('\n');
}

function createNewProgramsStatistics(e, timeline) {
    createChart(e, {
        type: 'line',
        data: {
            labels: Object.keys(timeline),
            datasets: [{
                label: 'New remixed Programs',
                backgroundColor: CHART_COLORS[1],
                data: Object.values(timeline).map(function(v) {
                    return v.remixes;
                })
            }, {
                label: 'New origin Programs',
                backgroundColor: CHART_COLORS[0],
                data: Object.values(timeline).map(function(v) {
                    return v.new;
                })
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function createPieWithStatistics(options) {
    var e = options.element;

    if (options.sort) {
        options.data = sortData(options.data, null);
    }

    createPieChart(e.querySelector('.chart'), options);
    options.createLegend(e.querySelector('.legend'), options);
    createPieChartStatistics(e.querySelector('.chart-statistics'), options);
}

function createPieChartLegendDualValues(legendElement, options) {
    var output = [];
    options.data.forEach(function(d) {
        output.push('<div class="legend-item legend-item-horizontal">' +
            '<div class="legend-block" style="background: ' + d.color + '"></div>' +
            '<span class="legend-text">' + d.label + '</span></div>');
    });
    if (options && options.reverseLegend) {
        output = output.reverse();
    }
    legendElement.innerHTML = output.join('\n');
}

function createPieChartLegendVertical(legendElement, options) {
    var output = [];
    options.data.forEach(function(d) {
        output.push('<div class="legend-item legend-item-vertical">' +
            '<div class="legend-block" style="background: ' + d.color + '"></div>' +
            '<span class="legend-text">' + d.label + '</span></div>');
    });
    if (options && options.reverseLegend) {
        output = output.reverse();
    }
    legendElement.innerHTML = output.join('\n');
}

function createPieChartStatistics(e, options) {
    var total = 0;
    var previousTotal = 0;
    options.data.forEach(function(d) {
        total += d.value;
        previousTotal += d.previousValue || 0;
    });
    var statistics = [];
    options.data.forEach(function(d, i) {
        statistics.push(createPieChartStatisticsRow(d.color, d.label,
            total, d.value, previousTotal, d.previousValue));
    });
    e.innerHTML = '<table class="table table-striped">'
        + statistics.join('\n') + '</table>';
}

function createPieChartStatisticsRow(color, label, total, value, previousTotal, previous) {
    return '<tr class="statistics-row">' +
        '<td><div class="legend-item">' +
        '<div class="legend-block" style="background: ' + color + '"></div>' +
        '<span>' + label + '</span></div></td>' +
        '<td class="text-right">' + value + '</td>' +
        '<td class="text-right">' + (value / total * 100).toFixed(2) + '%</td>' +
        '<td class="text-right">' +
        (isNumber(previousTotal) && isNumber(previous)
            ? toDiffHtml((value / total), (previous / previousTotal), {style: '1em'})
            : '') +
        '</td></tr>';
}


