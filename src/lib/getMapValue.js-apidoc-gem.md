The file `/var/www/html/scott/corona-map/src/getMapValue.js` is a JavaScript module that provides a set of utility functions for manipulating and extracting data related to COVID-19 statistics. Below is detailed documentation for each function and key logic within this file:

### Imports
- **`moment`**: A library for date manipulation. The import is from `moment-es6`, which indicates a version compatible with ECMAScript 6.

### Functions

#### `getLocationFips(data)`
- **Purpose**: To extract and return a filtered list of locations with their FIPS (Federal Information Processing Standard) codes from the input data.
- **Parameters**:
  - `data`: An object containing location data, which is expected to have a `location` property.
- **Returns**: An array of objects, each containing a `title` (location name) and `fips` (location FIPS code).
- **Logic**:
  - Constructs an array of location objects from `data.location`.
  - Filters out locations with FIPS codes matching the pattern `^\d\d000$` (likely representing state-level data).
  - Sorts the remaining locations by FIPS code in ascending order.

#### `deepClone(parent)`
- **Purpose**: To create a deep copy of a given object.
- **Parameters**:
  - `parent`: The object to be cloned.
- **Returns**: A new object that is a deep copy of the `parent`.
- **Logic**: Uses `JSON.parse` and `JSON.stringify` to clone the object.

#### `getStateDataByName(data, location)`
- **Purpose**: To find and return the state data corresponding to a specified location name.
- **Parameters**:
  - `data`: The data object containing location information.
  - `location`: A string representing the name of the location.
- **Returns**: The state data object for the specified location.
- **Logic**: Filters entries in `data.location` to find a match for the `location` name (case-insensitive).

#### `getDataValue(data, when, location, axis, addl = 0)`
- **Purpose**: To retrieve a specific data value for a given location, time, and data axis.
- **Parameters**:
  - `data`: The data object.
  - `when`: A string indicating the time frame.
  - `location`: The name of the location.
  - `axis`: The data axis (e.g., 'confirmed', 'deaths').
  - `addl`: An optional additional parameter for adjusting the index.
- **Returns**: The data value for the specified parameters.
- **Logic**: Utilizes `parseWhen` to determine the index, then retrieves the value from the location's series data.

#### `getDataValueById(data, when, id, axis, addl = 0)`
- **Purpose**: Similar to `getDataValue`, but retrieves data using a location ID instead of a name.
- **Parameters**: Same as `getDataValue`, but uses `id` (location ID) instead of `location`.
- **Returns**: The data value for the specified parameters.

#### `getDate(data, when)`
- **Purpose**: To get the date corresponding to a specified index.
- **Parameters**:
  - `data`: The data object.
  - `when`: A string indicating the time frame.
- **Returns**: The date string from the `data.dates` array.
- **Logic**: Uses `parseWhen` to find the index and returns the corresponding date.

#### `getFormattedDate(data, when, format)`
- **Purpose**: To retrieve and format a date from the data.
- **Parameters**:
  - `data`: The data object.
  - `when`: A string indicating the time frame.
  - `format`: The desired date format string.
- **Returns**: The formatted date string.
- **Logic**: Uses `moment` to format the date obtained from `getDate`.

#### `getPop(data, location)`
- **Purpose**: To get the population for a specified location.
- **Parameters**:
  - `data`: The data object.
  - `location`: The name of the location.
- **Returns**: The population of the specified location.

#### `getMaxValueForAxis(data, axis)`
- **Purpose**: To find the maximum value for a specific data axis across all locations.
- **Parameters**:
  - `data`: The data object.
  - `axis`: The data axis (e.g., 'confirmed', 'deaths').
- **Returns**: The maximum value found.
- **Logic**: Iterates over the `data.location` entries, ignoring rolled-up data, and computes the maximum of the last day's values for the specified axis.

#### `getLocationDataForDay(data, when, location)`
- **Purpose**: To gather a comprehensive data snapshot for a specific location on a given day.
- **Parameters**:
  - `data`: The data object.
  - `when`: A string indicating the time frame.
  - `location`: The name of the location.
- **Returns**: An object containing location data, population, date, and axis-specific data (confirmed, deaths, per capita).

#### `getLocationDataForDayById(data, when, id)`
- **Purpose**: Similar to `getLocationDataForDay`, but retrieves data using a location ID instead of a name.
- **Parameters**: Same as `getLocationDataForDay`, but uses `id` (location ID) instead of `location`.

#### `getTrimmedData(sourceData, when)`
- **Purpose**: To trim the data to a specified range of dates.
- **Parameters**:
  - `sourceData`: The original data object.
  - `when`: A string indicating the time frame.
- **Returns**: A new data object with date and series data trimmed to the specified range.
- **Logic**: Clones the source data, determines the date range using `parseWhen`, and filters dates and series data accordingly.

#### `parseWhen(data, when, addl = 0)`
- **Purpose**: To parse the `when` parameter and determine the minimum and maximum indices for the date range.
- **Parameters**:
  - `data`: The data object.
  - `when`: A string that can specify relative time (e.g. `-7` for the last 7 days) or a specific range (e.g. `1-10`).
  - `addl`: An optional adjustment for the indices.
- **Returns**: An array of two numbers representing the start and end indices.
- **Logic**: Handles relative dates, specific ranges, and defaults to the full range.

#### `capitalizeLocation(location)`
- **Purpose**: To capitalize the first letter of each word in a location string, with special handling for "united states".
- **Parameters**:
  - `location`: The location name string.
- **Returns**: A string with the location's name capitalized.
- **Logic**: Splits the location into words, capitalizes each, and joins them back together, appending "of America" for "united states".

#### `abbreviateNumber(num)`
- **Purpose**: To convert a number into an abbreviated string representation (e.g., 1,200 to "1.2K").
- **Parameters**:
  - `num`: The number to be abbreviated.
- **Returns**: A string representing the abbreviated number.
- **Logic**: Uses scientific notation to determine the appropriate suffix (K, M, B, T) based on magnitude.

#### `embellishData(data)`
- **Purpose**: To augment the data with additional computed series for each location.
- **Parameters**:
  - `data`: The data object.
- **Returns**: The embellished data object.
- **Logic**:
  - Adds total, per capita, and change series for both confirmed cases and deaths.
  - For each location, calculates these additional series based on existing data.
  - Uses population data to compute per capita values and differences between consecutive days for change values.

This documentation provides a thorough explanation of each function's purpose, parameters, return values, and internal logic to help developers understand and utilize the code effectively.