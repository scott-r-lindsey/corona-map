import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import mediaQuery from 'css-mediaquery';
import App from './App';

import appData from '../fixture/full.json';
import mapData from '../public/states-map.json';

// eslint-disable-next-line global-require
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('node-fetch');

const appDataUrl = '/data/full.json';
const mapDataUrl = '/states-map.json';

const { act } = require('react-dom/test-utils');

const url = '/COVID-US/now/confirmed/total/united%20states';

// -- mock mediaquery result ----------------------------------------------
const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {},
});
// ------------------------------------------------------------------------

const renderWithRouter = (component) => ({
  ...render(
    <MemoryRouter initialEntries={[url]}>
      {component}
    </MemoryRouter>,
  ),
});

describe('App.js', () => {
  let server;

  beforeAll(() => {
    window.matchMedia = createMatchMedia(1600);
  });

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondWith(
      'GET',
      mapDataUrl,
      [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(mapData),
      ],
    );

    fetchMock.getOnce(appDataUrl, appData);
  });

  afterEach(() => {
    server.restore();
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Loads json data and renders', async () => {
    let r;
    await act(async () => {
      r = renderWithRouter(<App />, {
        route: '/COVID-US/now/confirmed/total/united%20states',
      });
    });

    // validate http requests were made
    expect(fetchMock).toHaveFetched(appDataUrl);
    expect(server.requests.length).toEqual(1);
    expect(server.requests[0].url).toEqual(mapDataUrl);

    // validate the returned DOM is as expected
    const scott = /.*COVID-VIR.US is created and operated by Scott Lindsey.*/;
    const { getByText } = r;
    expect(getByText(scott)).toBeInTheDocument();
  });
});

test('nothing does nothing', () => {
  expect(true).toBeTruthy();
});
