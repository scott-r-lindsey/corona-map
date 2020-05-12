import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom';
import data from '../fixture/full.json';
const { act } = require("react-dom/test-utils");
import { createMount } from '@material-ui/core/test-utils';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';
import mediaQuery from 'css-mediaquery';

// -- load fetch mock before App ------------------------------------------
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')
import App from './App';
// ------------------------------------------------------------------------

// -- mock mediaquery result ----------------------------------------------
function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}
// ------------------------------------------------------------------------

enzyme.configure({ adapter: new Adapter() });
const url = '/COVID-US/now/confirmed/total/united%20states';

describe ('App.js', () => {

  const dataUrl = '/data/full.json';
  let mount;

  beforeAll(() => {
    window.matchMedia = createMatchMedia(1600);
  });

  beforeEach(() => {
    mount = createMount();
    fetchMock.getOnce(dataUrl, data);
  })

  afterEach(() => {
    mount.cleanUp();
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Loads the app', async () => {

    let wrapper;
    await act(async() => {

      wrapper = mount(
        <MemoryRouter initialEntries={[url]}>
          <App />
        </MemoryRouter>
      );
    });

    expect(fetchMock).toHaveFetched(dataUrl);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('div.loading-animation').html()).toBeTruthy();

  });
});
