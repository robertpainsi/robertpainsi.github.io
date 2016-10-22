"use strict";

var originalLineDraw = Chart.controllers.line.prototype.draw;
Chart.helpers.extend(Chart.controllers.line.prototype, {
    draw: function() {
        originalLineDraw.apply(this, arguments);

        var chart = this.chart;
        var ctx = chart.chart.ctx;

        var xaxis = chart.scales['x-axis-0'];
        var yaxis = chart.scales['y-axis-0'];
        var lineColor = colors.red;
        var verticalLines = chart.config.data.verticalLines;
        if (verticalLines) {
            verticalLines.forEach(function(verticalLine) {
                var pixel = xaxis.getPixelForValue(verticalLine);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(pixel, yaxis.top);
                ctx.strokeStyle = lineColor;
                ctx.lineTo(pixel, yaxis.bottom);
                ctx.stroke();
                ctx.restore();
            })
        }

        var horizontalLines = chart.config.data.horizontalLines;
        if (horizontalLines) {
            horizontalLines.forEach(function(horizontalLine) {
                var pixel = yaxis.getPixelForValue(horizontalLine);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(xaxis.left, pixel);
                ctx.strokeStyle = lineColor;
                ctx.lineTo(xaxis.right, pixel);
                ctx.stroke();
                ctx.restore();
            })
        }
    }
});
