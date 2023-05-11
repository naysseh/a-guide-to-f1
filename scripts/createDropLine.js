// ******* EXTERNAL FUNCTION *****: createDropLine
// Credit to Prof. Jeff Rzeszotarski, taken from Lecture on September 29, 2021 (INFO 3300).
function createDropLine(
  activeRegion,
  dropLine,
  label,
  valueMarker,
  bisect,
  xScaleLine,
  keys,
  values,
  lineGraphWidth,
  lineGraphHeight
) {
  activeRegion.on('mousemove', function (evt) {
    // Get mouse location
    let location = d3.pointer(evt);
    let x = location[0];
    // Use "invert" on a scale to go from pixels back to data
    let xYear = xScaleLine.invert(x);
    // We use the bisector to find the index of the element that's closest to our xYear
    let index = bisect(keys, xYear);
    // We can then get d, the data point that's closest
    let d = Number(values[index - 1]);
    // From there, it's just a matter of updating positions using our scales like we've done for a while now
    let xPos = xScaleLine(keys[index - 1]) + 50;
    let yPos = yScaleLine(values[index - 1]) + 10;
    console.log(
      d,
      xPos,
      d3.timeFormat('%M min %S sec')(d),
      Math.round(d / 1000 / 60) +
        ' min ' +
        ((d / 1000) % 60).toFixed(2) +
        ' sec'
    );

    dropLine.attr('x1', xPos).attr('x2', xPos);
    valueMarker.attr('cx', xPos).attr('cy', yPos);

    label
      .text(
        Math.round(d / 1000 / 60) +
          ' min ' +
          ((d / 1000) % 60).toFixed(2) +
          ' sec'
      )
      .style('fill', 'white');
    if (xPos < lineGraphWidth / 2.0) {
      label.attr('x', xPos + 10).attr('text-anchor', 'start');
    } else {
      label.attr('x', xPos - 10).attr('text-anchor', 'end');
    }
    if (yPos > lineGraphHeight / 2.0) {
      label.attr('y', 150);
    } else {
      label.attr('y', lineGraphHeight - 100);
    }
  });
}
