**env.js File Documentation**
=====================================

### Overview

This JavaScript file, located at `/var/www/html/scott/corona-map/src/env.js`, serves as a configuration environment for a React application. It exports a default object containing common configuration values and environment-specific settings.

### Configuration Sections

#### Development Environment (`dev`)

```javascript
const dev = {
  GA_ACCOUNT: 'UA-161846587-2',
};
```

*   This section defines the development environment's Google Analytics (GA) account ID.
*   The `dev` object is used as a starting point for the application's configuration.

#### Production Environment (`prod`)

```javascript
const prod = {
  GA_ACCOUNT: 'UA-161846587-1',
};
```

*   This section defines the production environment's Google Analytics (GA) account ID.
*   The `prod` object is used as an alternative configuration when `REACT_APP_STAGE` equals `'prod'`.

### Environment Variable Logic

The file uses a simple logic to determine which configuration to use based on the value of `REACT_APP_STAGE`:

```javascript
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;
```

*   If `REACT_APP_STAGE` is set to `'prod'`, the production environment (`prod`) is used.
*   Otherwise, the development environment (`dev`) is used.

### Exported Configuration Object

```javascript
export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
```

*   This object exports the application's configuration, combining common settings (`MAX_ATTACHMENT_SIZE`) with either the development or production environment's configuration (`config`).
*   The `...config` syntax spreads the contents of the `config` object into the exported object, overriding any duplicate keys.

### Notes

*   The `REACT_APP_STAGE` environment variable is used to determine which configuration to use.
*   Common configuration values (e.g., `MAX_ATTACHMENT_SIZE`) are defined in this file and can be extended or modified as needed.