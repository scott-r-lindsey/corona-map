**App-enzyme.test.jsx**
=====================================

### Description

This is a test file written using Jest and Enzyme libraries for React. It tests the `App` component from the `src/App.js` file.

### Code

```jsx
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
/**
 * Creates a mock for the `matchMedia` API.
 *
 * @param {number} width - The width to use in the mock.
 * @returns {Object} A mock implementation of the `matchMedia` API.
 */
function createMatchMedia(width) {
  return (query) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
}
// ------------------------------------------------------------------------

/**
 * Configures Enzyme with a new adapter for React 16.
 */
enzyme.configure({ adapter: new Adapter() });

const url = '/COVID-US/now/confirmed/total/united%20states';

describe('App.js', () => {
  const dataUrl = '/data/full.json';
  let mount;

  /**
   * Sets up the test environment before all tests are run.
   */
  beforeAll(() => {
    window.matchMedia = createMatchMedia(1600);
  });

  /**
   * Sets up the test environment for each test.
   */
  beforeEach(() => {
    mount = createMount();
    fetchMock.getOnce(dataUrl, data);
  });

  /**
   * Cleans up after each test.
   */
  afterEach(() => {
    mount.cleanUp();
    fetchMock.reset();
    fetchMock.restore();
  });

  /**
   * Tests that the app loads correctly.
   */
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
```

### Functions and Classes

#### `createMatchMedia(width)`

*   A function that creates a mock implementation of the `matchMedia` API.
*   Takes a single argument `width`, which is used to set the width for the mock.

#### `enzyme.configure({ adapter: new Adapter() })`

*   Configures Enzyme with a new adapter for React 16.
*   Sets up Enzyme to work with React 16.

#### `createMount()`

*   A function from Material-UI's test utilities that creates a mount for the component tree.
*   Returns an object with methods for mounting, cleaning up, and other utility functions.

#### `fetchMock.getOnce(dataUrl, data)`

*   A mock implementation of the `get` method in Jest's `fetch-mock-jest` library.
*   Simulates a GET request to `dataUrl` with a response body equal to `data`.
*   Resets after each test.

### Key Logic

*   The test loads the app by mounting it using Enzyme and Material-UI's test utilities.
*   It then checks that the fetch mock has been used to make a GET request to `dataUrl`, which contains the data fetched by the app.
*   Finally, it checks that the app renders correctly, including the loading animation.