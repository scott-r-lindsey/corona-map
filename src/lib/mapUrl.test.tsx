import * as React from "react";
import updateUrl from './mapUrl';

describe('updateUrl', () => {
  const base = {
    mode: 'COVID-US',
    when:'now',
    axis:'confirmed',
    quant:'total',
    location:'united states',
  };

  it('does nothing', () => {
    expect(true).toBeTruthy();
  });




/*
  it('updates the mode', () => {
    console.log(updateUrl);
    const url = updateUrl(base, {mode: 'COVID-COUNTY'});
    expect(url).toEqual('/foobar/now/confirmed/total/united states');
  });
*/

  it('updates the location', () => {
    const url = updateUrl(base, {location: 'foobar'});
    expect(url).toEqual('/COVID-US/now/confirmed/total/foobar');
  });

});
