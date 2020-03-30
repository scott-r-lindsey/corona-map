const updateUrl = (current, changes, domain = 'COVID-US') => {

  const update = {...current, ...changes};
  const { when, axis, location } = update;

  return `/${domain}/${when}/${axis}/${location}`;
}

export default updateUrl;
