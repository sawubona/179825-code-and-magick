'use strict';

const createHistogramData = (sortingTimes, index, gamertime) => {
  const maxTime = Math.max.apply(null, sortingTimes).toFixed();
  const minTime = Math.min.apply(null, sortingTimes).toFixed();
  const maxHistogramHeight = 150;
  const histogramWidth = 40;
  const startY = 250;
  const startX = 65;
  const columnDistance = 50;
  const redFill = 'rgba(255, 0, 0, 1)';
  const stepY = maxHistogramHeight / (maxTime - 0);
  let stepX = startX + (index * (columnDistance + histogramWidth));
  let histogramHeight = gamertime * stepY;
  let blueFill = (`rgba(0, 0, 139, ${(maxHistogramHeight / gamertime) * 10}`);
  return {
    histogramHeight,
    maxHistogramHeight,
    stepX,
    startY,
    histogramWidth,
    minTime,
    redFill,
    blueFill
  };
};

const renderHistogramWrapper = ctx => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Список результатов:', 120, 60);
};

const renderColumn = (ctx, stepX, startY, histogramWidth, histogramHeight, gamername, gamertime, columnFill) => {
  ctx.fillStyle = (`${columnFill}`);
  ctx.fillRect(stepX, startY, histogramWidth, -histogramHeight);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillText(gamername, stepX, 270);
  ctx.fillText(gamertime, stepX, startY - histogramHeight - 10);
};

var renderStatistics = (ctx, names, times) => {
  renderHistogramWrapper(ctx);
  const sortingTimes = times.sort();
  let renderHistogram = (gamertime, gamername, index) => {
    let {
      histogramHeight,
      maxHistogramHeight,
      stepX,
      startY,
      histogramWidth,
      minTime,
      redFill,
      blueFill
    } = createHistogramData(sortingTimes, index, gamertime);
    if (histogramHeight > maxHistogramHeight) {
      histogramHeight = maxHistogramHeight;
    }
    if (gamername === 'Вы') {
      renderColumn(ctx, stepX, startY, histogramWidth, histogramHeight, gamername, gamertime, redFill);
      if (gamertime <= minTime) {
        ctx.fillStyle = '#000';
        ctx.font = '16px PT Mono';
        ctx.fillText('Ура вы победили!', 120, 40);
      }
    } else {
      renderColumn(ctx, stepX, startY, histogramWidth, histogramHeight, gamername, gamertime, blueFill);
    }
  };

  for (let i = 0; i < sortingTimes.length; i++) {
    renderHistogram(sortingTimes[i].toFixed(), names[i], i + 1);
  };
};

