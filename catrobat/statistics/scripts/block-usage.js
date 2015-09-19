"use strict";

function createEnhancedBlockUsageChart(e, brickUsage, previousBrickUsage) {
    function enhanceBrickData(bricks, previousBricks) {
        var allBricks = {};
        Object.keys(bricks).forEach(function(type) {
            var brick = bricks[type];
            allBricks[type] = {
                name: brick.name,
                color: brick.color,
                count: brick.count
            };

            if (previousBricks) {
                allBricks[type].previousCount = 0;
            }
        });
        if (previousBricks) {
            Object.keys(previousBricks).forEach(function(type) {
                var brick = previousBricks[type];

                if (allBricks[type]) {
                    allBricks[type].previousCount = brick.count;
                } else {
                    allBricks[type] = {
                        name: brick.name,
                        color: brick.color,
                        count: 0,
                        previousCount: brick.count
                    }
                }
            });
        }

        var result = [];
        var mergeBricks = {
            'IfLogicEndBrick': null,
            'IfThenLogicEndBrick': null,
            'LoopEndBrick': null,
            'LoopEndlessBrick': null,
            'VideoBrick': null,
            'IfThenLogicBeginBrick': 'IfLogicBeginBrick',
            'ShowVariableBrick': 'ShowTextBrick',
            'WhenBrick': 'WhenScript'
        };
        Object.keys(allBricks).forEach(function(type) {
            var brick = allBricks[type];
            if (mergeBricks.hasOwnProperty(type)) {
                if (mergeBricks[type]) {
                    allBricks[mergeBricks[type]].count += brick.count;
                    if (previousBricks) {
                        allBricks[mergeBricks[type]].previousCount += brick.previousCount;
                    }
                }
                return;
            }
            result.push(brick);
        });
        return result;
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
            '<td class="shrink" style="vertical-align: middle; color: ' + color + '; white-space: nowrap">' + name + '</td>' +
            '<td class="expand" style="vertical-align: middle; width: 99%; ' +
            'background: linear-gradient(90deg, rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.85) ' + relativePercent + '%, transparent ' + relativePercent + '%); ' +
            'padding-left: 4px; padding-right: 4px">' +
            '<span style="float: left">' + percentValue + '% ' + diff + '</span>'
            + '<span style="float: right">' + count + '</span></td></tr><tr><td style="height: 2px"></td></tr>'
        );
    });
    e.innerHTML = rows.join('\n');
}
