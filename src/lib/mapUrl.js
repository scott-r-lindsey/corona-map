const updateUrl = (current, changes) => {
  const update = { ...current, ...changes };
  const {
    mode, when, axis, quant, location,
  } = update;

  return `/${mode}/${when}/${axis}/${quant}/${location}`;
};

export default updateUrl;
