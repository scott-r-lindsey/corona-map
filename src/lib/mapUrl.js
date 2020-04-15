const updateUrl = (current, changes, domain = 'COVID-US') => {

  const update = {...current, ...changes};
  const { when, axis, quant, location } = update;

  return `/${domain}/${when}/${axis}/${quant}/${location}`;
}

export default updateUrl;
