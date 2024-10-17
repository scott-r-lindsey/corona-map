Below is a detailed documentation for the JavaScript test file located at `/var/www/html/scott/corona-map/src/getMapValue.test.js`. This file contains a series of unit tests designed to verify the behavior of various functions imported from the `getMapValue` module.

### File Overview

The purpose of this file is to test the functionality of functions that manipulate and retrieve data related to COVID-19 statistics. The data is structured as a set of dates and locations, with each location containing a series of statistics such as confirmed cases and deaths.

### Imported Functions

The following functions are imported from the `getMapValue` module and are tested in this file:

- **`getTrimmedData`**: Trims the data based on a specified range of dates.
- **`parseWhen`**: Parses a date range or position (such as "now" or "-2") into corresponding start and end indices.
- **`getDate`**: Retrieves the actual date value from the data based on a specified position.
- **`getDataValue`**: Fetches a value from the data based on location name, date position, and the type of data (e.g., confirmed cases).
- **`getDataValueById`**: Similar to `getDataValue`, but fetches data based on a location ID.

### Test Data

A sample data structure, `data`, is used throughout the tests:

- **`dates`**: An array of integers representing a sequence of dates.
- **`location`**: An object where each key is a location ID and each value contains:
  - `name`: The name of the location.
  - `series`: An object containing arrays of data points for `confirmed` cases and `deaths`.

### Utility Functions

- **`clone`**: A helper function to deep clone JavaScript objects using JSON serialization, ensuring tests operate on a fresh copy of the data.
- **`dataBak`**: A backup copy of the `data` object, used to verify that tests do not mutate the original data.

### Test Suites and Cases

#### `getDataValueById`

- **Functionality**: Fetches data values by location ID.
- **Tests**:
  - Fetches the most recent value (`"now"`).
  - Fetches a specific past value (`"-2"`).
  - Fetches a range of dates with additional offset (`"4-9"` with `addl -1`).

#### `getDataValue`

- **Functionality**: Fetches data values by location name.
- **Tests**:
  - Fetches the most recent value (`"now"`).
  - Fetches adjusted recent value (`"now"` with additional offset `-1`).
  - Fetches a specific past value (`"-2"`).
  - Fetches a range of dates with additional offset (`"4-9"` with `addl -1`).

#### `getDate`

- **Functionality**: Retrieves date values based on positions.
- **Tests**:
  - Fetches the most recent date (`"now"`).
  - Fetches a specific past date (`"-9"`).
  - Fetches a date within a range (`"2-4"`).

#### `getTrimmedData`

- **Functionality**: Returns a trimmed version of the data based on a date range.
- **Tests**:
  - Handles "now" and ensures the original data structure remains unchanged.
  - Tests ranges that effectively result in no change (`"2-2"`, `"3-2"`).
  - Tests trimming the data to a specific past range (`"-8"`).
  - Tests trimming the data to a specific date range (`"2-4"`).

#### `parseWhen`

- **Functionality**: Converts date descriptions into index ranges.
- **Tests**:
  - Parses `"now"` and adjusted `"now"` (`"now"` with additional offset `-1`).
  - Handles default parsing of invalid input (`"foo"`).
  - Handles negative offsets (`"-2"`, `"-2"` with `addl -1`).
  - Parses specific ranges (`"1-2"`, `"2-3"` with `addl -1`).

### Conclusion

Each test suite verifies that the functions correctly manipulate and retrieve data without altering the original dataset. The tests ensure that the functions can handle various inputs, including edge cases and invalid inputs, gracefully.