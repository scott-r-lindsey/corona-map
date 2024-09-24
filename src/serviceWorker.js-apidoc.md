```javascript
/* eslint-disable */ 

// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

/**
 * Determines if the current host is localhost.
 * This is useful for debugging and local development.
 */
const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
    // [::1] is the IPv6 localhost address.
    || window.location.hostname === '[::1]'
    // 127.0.0.0/8 are considered localhost for IPv4.
    || window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    ),
);

/**
 * Registers the service worker.
 * @param {Object} config - Optional configuration object.
 */
export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets.
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    // Register the service worker after the window has loaded.
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service '
              + 'worker. To learn more, visit https://bit.ly/CRA-PWA',
          );
        });
      } else {
        // Is not localhost. Just register service worker.
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Registers a valid service worker.
 * @param {string} swUrl - The URL of the service worker.
 * @param {Object} config - Optional configuration object.
 */
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all '
                  + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.',
              );

              // Execute the onUpdate callback if provided.
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute the onSuccess callback if provided.
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

/**
 * Checks if a valid service worker exists and, if not, reloads the page.
 * @param {string} swUrl - The URL of the service worker.
 * @param {Object} config - Optional configuration object.
 */
function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404
        || (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    });
}

/**
 * Unregisters the service worker.
 */
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
```

### Detailed Documentation

#### Constants

- **`isLocalhost`**: A boolean constant that checks if the current host is localhost. This is determined by comparing the hostname with 'localhost', the IPv6 localhost address '[::1]', and any IP addresses in the 127.0.0.0/8 range.

#### Functions

1. **`register(config)`**
   - **Description**: Registers the service worker if the environment is production and the browser supports service workers.
   - **Parameters**:
     - `config`: An optional configuration object containing callbacks `onUpdate` and `onSuccess`.
   - **Logic**:
     - Checks if the environment is production and if the browser supports service workers.
     - Creates a URL object for `PUBLIC_URL` and verifies that it matches the origin of the page.
     - Adds an event listener to the window's load event to register the service worker.
     - If running on localhost, it validates the service worker and logs additional information.
     - If not on localhost, it simply registers the service worker.

2. **`registerValidSW(swUrl, config)`**
   - **Description**: Registers a valid service worker.
   - **Parameters**:
     - `swUrl`: The URL of the service worker.
     - `config`: An optional configuration object containing callbacks `onUpdate` and `onSuccess`.
   - **Logic**:
     - Registers the service worker and listens for updates.
     - If a new service worker is found, it checks the state of the installing worker.
     - If the state is 'installed', it logs a message and executes the appropriate callback (`onUpdate` or `onSuccess`).

3. **`checkValidServiceWorker(swUrl, config)`**
   - **Description**: Checks if a valid service worker exists and reloads the page if not.
   - **Parameters**:
     - `swUrl`: The URL of the service worker.
     - `config`: An optional configuration object containing callbacks `onUpdate` and `onSuccess`.
   - **Logic**:
     - Fetches the service worker script.
     - If the response indicates that no service worker exists (404 or non-JS content type), it unregisters any existing service worker and reloads the page.
     - If a valid service worker is found, it proceeds to register it.

4. **`unregister()`**
   - **Description**: Unregisters the service worker.
   - **Logic**:
     - Checks if the browser supports service workers.
     - Unregisters the service worker when it is ready.

### Usage

- **Registering the Service Worker**: Call `register(config)` during your application's initialization to enable the service worker.
- **Unregistering the Service Worker**: Call `unregister()` if you need to remove the service worker for any reason.

### Additional Notes

- **Offline Capabilities**: The service worker allows the application to cache assets and provides offline capabilities.
- **Caching Strategy**: The service worker uses a cache-first strategy, meaning it serves cached content if available and fetches from the network otherwise.
- **Updates**: Updates to the service worker are handled in the background, and new content becomes available after all tabs using the old service worker are closed.