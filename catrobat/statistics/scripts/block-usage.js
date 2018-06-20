"use strict";

function createEnhancedBlockUsageChart(e, brickUsage, previousBrickUsage, display) {
    function enhanceBrickData(bricks, previousBricks) {
        var allBricks = {};
        Object.keys(bricks).forEach(function(type) {
            var brickDisplay = display[type];
            allBricks[type] = {
                name: brickDisplay.name,
                color: brickDisplay.color,
                count: bricks[type]
            };

            if (previousBricks) {
                allBricks[type].previousCount = 0;
            }
        });
        if (previousBricks) {
            Object.keys(previousBricks).forEach(function(type) {
                if (allBricks[type]) {
                    allBricks[type].previousCount = previousBricks[type];
                } else {
                    var brickDisplay = display[type];
                    allBricks[type] = {
                        name: brickDisplay.name,
                        color: brickDisplay.color,
                        count: 0,
                        previousCount: previousBricks[type]
                    }
                }
            });
        }
        return Object.values(allBricks);
    }

    createBlockUsageChart(e, enhanceBrickData(brickUsage, previousBrickUsage));
}

function createBlockUsageChart(e, blocks) {
    blocks = blocks.sort(function(a, b) {
        return b.count - a.count;
    });

    var hasPrevious = false;
    var total = 0;
    var previousTotal = 0;
    blocks.forEach(function(block) {
        total += block.count;
        previousTotal += block.previousCount;
        if (block.previousCount !== undefined) {
            hasPrevious = true;
        }
    });

    var firstPercent = null;
    var rows = [];
    blocks.forEach(function(block) {
        var percent = block.count / total;
        if (firstPercent === null) {
            firstPercent = percent;
        }
        var name = block.name;
        var color = '#' + block.color;
        var rgb = colorUtils.hexToRGB(block.color);
        var percentValue = (Math.round(percent * 100 * 100) / 100).toFixed(2);
        var relativePercent = (percent / firstPercent) * 100;
        var count = block.count;
        var diff = '';
        if (hasPrevious) {
            var previousRelativePercent = block.previousCount / previousTotal;
            diff = toDiffHtml(percent, previousRelativePercent);
        }
        rows.push('<tr align="right">' +
            '<td class="shrink" style="vertical-align: middle; padding-right: 2px; color: ' + color + '; white-space: nowrap">' + name + '</td>' +
            '<td class="expand" style="vertical-align: middle; width: 99%; ' +
            'background: linear-gradient(90deg, rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.85) ' + relativePercent + '%, transparent ' + relativePercent + '%); ' +
            'padding-left: 4px; padding-right: 4px">' +
            '<span style="float: left">' + percentValue + '% ' + '</span>' +
            '<span style="float: right">' + count + '</span></td>' +
            '<td class="shrink" style="vertical-align: middle;">' +
            diff +
            '</td>' +
            '</tr><tr><td style="height: 2px"></td>' +
            '</tr>'
        );
    });
    e.innerHTML = rows.join('\n');
}
