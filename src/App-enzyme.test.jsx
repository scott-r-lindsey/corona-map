import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { createMount } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import data from '../fixture/full.json';
import App from './App';

const { act } = require('react-dom/test-utils');

// -- load fetch mock before App ------------------------------------------
// eslint-disable-next-line global-require
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = require('node-fetch');
// ------------------------------------------------------------------------

// -- mock mediaquery result ----------------------------------------------
function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}
// ------------------------------------------------------------------------

enzyme.configure({ adapter: new Adapter() });
const url = '/COVID-US/now/confirmed/total/united%20states';

describe('App.js', () => {
  const dataUrl = '/data/full.json';
  let mount;

  beforeAll(() => {
    window.matchMedia = createMatchMedia(1600);
  });

  beforeEach(() => {
    mount = createMount();
    fetchMock.getOnce(dataUrl, data);
  });

  afterEach(() => {
    mount.cleanUp();
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Loads the app', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <MemoryRouter initialEntries={[url]}>
          <App />
        </MemoryRouter>,
      );
    });

    expect(fetchMock).toHaveFetched(dataUrl);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('div.loading-animation').html()).toBeTruthy();
  });
});
