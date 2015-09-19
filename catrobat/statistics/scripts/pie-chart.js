"use strict";

function createPieChart(canvas, options) {
    var ctx = canvas.getContext("2d");
    var data = options.data || [];

    function drawCircle(highlight) {
        var lastEnd = -Math.PI / 2;
        var total = sumValue(data);
        data.forEach(function(d, i) {
            var value = d.value;
            var color = d.color || CHART_COLORS[i];
            d.color = color;
            if (i === highlight) {
                color = colorUtils.increaseBrightnessColor(color, 8);
            }

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastEnd, lastEnd + (Math.PI * 2 * (value / total)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastEnd += Math.PI * 2 * (value / total);
        });
    }

    function sumValue(data) {
        return data.reduce(function(acc, d) {
            return acc + d.value;
        }, 0);
    }

    canvas.onmousemove = function(e) {
        var centerX = canvas.clientWidth / 2;
        var centerY = canvas.clientHeight / 2;
        var x = e.offsetX - centerX;
        var y = centerY - e.offsetY;

        if (mathUtils.distance(x, y) > centerX) {
            drawCircle();
            return;
        }

        var angle = mathUtils.toDegrees(Math.atan2(x, y));
        if (angle < 0) {
            angle = 360 + angle;
        }
        var overValue = angle / 360 * sumValue(data);

        var currentTotal = 0;
        data.some(function(d, i) {
            currentTotal += d.value;
            if (overValue < currentTotal || i === data.length - 1) {
                drawCircle(i);
                if (options.onHover) {
                    options.onHover(d);
                }
                return true;
            }
        });
    };

    canvas.onmouseout = function(e) {
        drawCircle();
    };

    drawCircle();
}
