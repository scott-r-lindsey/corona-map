import React from "react";
import updateUrl from './mapUrl';

describe('updateUrl', () => {
  const base = {
    mode: 'COVID-US',
    when:'now',
    axis:'confirmed',
    quant:'total',
    location:'united states',
  };

  it('updates the mode', () => {
    const url = updateUrl(base, {mode: 'COVID-COUNTY'});
    expect(url).toEqual('/COVID-COUNTY/now/confirmed/total/united states');
  });

  it('updates the location', () => {
    const url = updateUrl(base, {location: 'foobar'});
    expect(url).toEqual('/COVID-US/now/confirmed/total/foobar');
  });
});
