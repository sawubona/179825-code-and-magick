'use strict';

var renderStatistics = (ctx, names, times) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
    ctx.fillRect(100, 10, 420, 270);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    const sortingTimes = times.sort();
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const gamers = new Gamer(name, sortingTimes[i], i);
        gamers.render();
    };

    function Gamer(name, time, index) {
        this.index = index + 1;
        this.name = name;
        this.score = time.toFixed();

        const maxHistogramHeight = 150;
        const histogramWidth = 40;
        const startY = 250;
        const startX = 65;
        const columnDistance = 50;
        const stepY = maxHistogramHeight/(Math.max.apply(null, times)-0);
        let stepX = startX + (this.index * (columnDistance + histogramWidth));
        let histogramHeight = this.score * stepY;

        if (histogramHeight > maxHistogramHeight) {
            histogramHeight = maxHistogramHeight;
        };

        this.render = () => {
            if (this.name === 'Вы') {
                ctx.fillStyle = 'rgba(255, 0, 0, 1)';
                ctx.fillRect(stepX, startY, histogramWidth, - histogramHeight);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillText(this.name, stepX, 270);
                ctx.fillText(this.score, stepX, startY - histogramHeight - 10);
            } else {
                ctx.fillStyle = (`rgba(0, 0, 139, ${(maxHistogramHeight/this.score)*10}`);
                ctx.fillRect(stepX, startY, histogramWidth, - histogramHeight);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillText(this.name, stepX, 270);
                ctx.fillText(this.score, stepX, startY - histogramHeight - 10);
            }
        }
    };
};