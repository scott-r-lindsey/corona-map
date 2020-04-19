export const logmidpoints = (min, max, steps) => {
  const points = [];
  const logmax = Math.log(max) *.9; //  fudge factor for fun
  const logmin = Math.log(min);

  for (let v = logmin; v <= logmax; v += (logmax-logmin) / steps) {
    points.push(Math.exp(v));
  }
  return points;
}

