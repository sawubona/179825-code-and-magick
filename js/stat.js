'use strict';

var renderStatistics = (ctx, names, times) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
    ctx.fillRect(100, 10, 420, 270);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Список результатов:', 120, 60);

    const sortingTimes = times.sort();

    let renderHistogram = (gamertime, gamername, index) => {
        const maxTime = Math.max.apply(null, sortingTimes).toFixed();
        const minTime = Math.min.apply(null, sortingTimes).toFixed();
        const maxHistogramHeight = 150;
        const histogramWidth = 40;
        const startY = 250;
        const startX = 65;
        const columnDistance = 50;
        const stepY = maxHistogramHeight / (maxTime - 0);
        let stepX = startX + (index * (columnDistance + histogramWidth));
        let histogramHeight = gamertime * stepY;

        if (histogramHeight > maxHistogramHeight) {
            histogramHeight = maxHistogramHeight;
        }
        if (gamername === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillRect(stepX, startY, histogramWidth, - histogramHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillText(gamername, stepX, 270);
            ctx.fillText(gamertime, stepX, startY - histogramHeight - 10);
            if (gamertime <= minTime) {
                ctx.fillStyle = '#000';
                ctx.font = '16px PT Mono';
                ctx.fillText('Ура вы победили!', 120, 40);
            }
        } else {
            ctx.fillStyle = (`rgba(0, 0, 139, ${(maxHistogramHeight / gamertime) * 10}`);
            ctx.fillRect(stepX, startY, histogramWidth, - histogramHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillText(gamername, stepX, 270);
            ctx.fillText(gamertime, stepX, startY - histogramHeight - 10);
        }
    };

    for (let i = 0; i < sortingTimes.length; i++) {
        renderHistogram(sortingTimes[i].toFixed(), names[i], i + 1);
    };
};