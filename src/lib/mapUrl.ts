// fixme add type enums

interface CurrentParams {
  mode: 'COVID-US' | 'COVID-COUNTY';
  //mode: string;
  when: string;
  axis: string;
  quant: string;
  location: string;
}
interface UpdateParams {
  mode?: 'COVID-US' | 'COVID-COUNTY';
  //mode?: string;
  when?: string;
  axis?: string;
  quant?: string;
  location?: string;
}

const updateUrl = (current: CurrentParams, changes: UpdateParams ): string => {
  const update = {...current, ...changes};
  const { mode, when, axis, quant, location } = update;

  return `/${mode}/${when}/${axis}/${quant}/${location}`;
}

export default updateUrl;
