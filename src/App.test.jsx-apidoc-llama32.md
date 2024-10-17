**App.test.jsx**
================

### Overview

This file contains a set of unit tests for the `App` component using Jest and React Testing Library.

### Dependencies

* `React`: The React library
* `render`: A function from React Testing Library that renders a component to the DOM
* `MemoryRouter`: A router from `react-router-dom` used to mock client-side routing
* `sinon`: A testing utility for creating fake servers and mocking functions
* `mediaQuery`: A CSS media query library used to create fake matchMedia instances
* `App`: The `App` component being tested
* `appData`: JSON data fixture from a file (`../fixture/full.json`)
* `mapData`: JSON data fixture from a file (`../public/states-map.json`)
* `fetch-mock-jest`: A mock implementation of the `node-fetch` library

### Test Suite

The test suite consists of two tests:

1. `it('Loads json data and renders', async () => { ... }`
2. `test('nothing does nothing', () => { ... })`

#### 1. Load JSON Data and Render

```javascript
describe('App.js', () => {
  let server;

  beforeAll(() => {
    // Create a fake matchMedia instance with a width of 1600
    window.matchMedia = createMatchMedia(1600);
  });

  beforeEach(() => {
    // Create a fake server and set up mock responses for the `appData` and `mapData` URLs
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
    // Restore the fake server and reset the mock
    server.restore();
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Loads json data and renders', async () => {
    let r;
    await act(async () => {
      // Render the `App` component with a mock router entry point
      r = renderWithRouter(<App />, {
        route: '/COVID-US/now/confirmed/total/united%20states',
      });
    });

    // Validate that the fake server was called with the correct request URL
    expect(fetchMock).toHaveFetched(appDataUrl);
    expect(server.requests.length).toEqual(1);
    expect(server.requests[0].url).toEqual(mapDataUrl);

    // Validate that the returned DOM contains the expected text
    const scott = /.*COVID-VIR.US is created and operated by Scott Lindsey.*/;
    const { getByText } = r;
    expect(getByText(scott)).toBeInTheDocument();
  });
});
```

#### 2. Nothing Does Nothing

```javascript
test('nothing does nothing', () => {
  // This test simply checks that the expectation `expect(true).toBeTruthy()` evaluates to true.
  // There is no actual implementation or validation in this test, only a placeholder statement.
  expect(true).toBeTruthy();
});
```

### Functions and Classes

#### `createMatchMedia(width)`

Creates a fake matchMedia instance with the specified width. This function is used to set up the mock environment for the tests.

* Parameters: `width` (number) - The width of the media query
* Returns: A function that returns an object with methods for checking matches and adding/removing listeners

#### `renderWithRouter(component, options)`

Renders a component using React Testing Library and sets up a mock router entry point.

* Parameters:
	+ `component` (React component) - The component to render
	+ `options` (object) - An object containing the route URL for the mock router

#### `sinon.fakeServer.create()`

Creates a new fake server instance using Sinon. This is used to simulate HTTP requests in the tests.

* Returns: A fake server instance with methods for responding to requests and restoring its state

#### `fetchMock.getOnce(url, data)`

Sets up a mock implementation of the `node-fetch` library to respond to GET requests at the specified URL with the provided data.

* Parameters:
	+ `url` (string) - The URL to respond to
	+ `data` (any) - The response data to return

#### `fetchMock.restore()`

Restores the mock implementation of the `node-fetch` library, restoring its original behavior.

* Parameters: None

#### `sinon.fakeServer.restore()`

Restores a fake server instance to its original state, resetting any stored requests or responses.