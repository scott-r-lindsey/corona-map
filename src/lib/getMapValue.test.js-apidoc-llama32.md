```javascript
/**
 * File: getMapValue.test.js
 * Purpose: Unit tests for getMapValue module.
 */

import {
  /**
   * Function: getTrimmedData
   * Description: Trims data to a specific date range or value.
   * 
   * Args:
   * - data (object): The original data object.
   * - when (string): The date range or value to trim. Can be 'now', '-2', or a date range in the format of 'X-Y'.
   * Returns: An object with the trimmed data, including a raw property for the original data and any modified properties.
   */
  getTrimmedData,
  
  /**
   * Function: parseWhen
   * Description: Parses a date string into an array of indices representing the start and end dates in the data.
   * 
   * Args:
   * - data (object): The original data object.
   * - when (string): The date range or value to parse. Can be 'now', '-2', or a date range in the format of 'X-Y'.
   * Returns: An array of two indices representing the start and end dates in the data.
   */
  parseWhen,
  
  /**
   * Function: getDate
   * Description: Retrieves the original date corresponding to a trimmed date value.
   * 
   * Args:
   * - data (object): The original data object.
   * - when (string): The trimmed date value.
   * Returns: An integer representing the original date in the data.
   */
  getDate,
  
  /**
   * Function: getDataValue
   * Description: Retrieves a specific date value from the data based on the location and axis.
   * 
   * Args:
   * - data (object): The original data object.
   * - when (string): The trimmed date value or range. Can be 'now', '-2', or a date range in the format of 'X-Y'.
   * - location (integer): The location ID to retrieve data from.
   * - axis (string): The axis to retrieve data from ('confirmed' or 'deaths').
   * Returns: An integer representing the retrieved date value.
   */
  getDataValue,
  
  /**
   * Function: parseWhen
   * Description: Parses a date string into an array of indices representing the start and end dates in the data.
   * 
   * Args:
   * - data (object): The original data object.
   * - when (string): The date range or value to parse. Can be 'now', '-2', or a date range in the format of 'X-Y'.
   * Returns: An array of two indices representing the start and end dates in the data.
   */
  parseWhen,
} from './getMapValue';

describe('getTrimmedData function', () => {
  it('trims data to "now" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = getTrimmedData(data, 'now');
    expect(result).toEqual({
      raw: data,
      dates: [1, 2, 3],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30],
            deaths: [2, 4, 6],
          },
        },
      },
    });
  });

  it('trims data to "-8" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = getTrimmedData(data, '-8');
    expect(result).toEqual({
      raw: data,
      dates: [1, 2],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20],
            deaths: [2, 4],
          },
        },
      },
    });
  });

  it('trims data to "2-4" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = getTrimmedData(data, '2-4');
    expect(result).toEqual({
      raw: data,
      dates: [3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [30, 40, 50],
            deaths: [6, 8, 10],
          },
        },
      },
    });
  });
});

describe('parseWhen function', () => {
  it('parses "now" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = parseWhen(data, 'now');
    expect(result).toEqual([0, 4]);
  });

  it('parses "-2" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = parseWhen(data, '-2');
    expect(result).toEqual([-1, 3]);
  });

  it('parses "foo" range', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = parseWhen(data, 'foo');
    expect(result).toEqual([0, 4]);
  });
});

describe('getDataValue function', () => {
  it('returns retrieved date value for confirmed series', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = getDataValue(data, 'confirmed', 3);
    expect(result).toEqual(30);
  });

  it('returns retrieved date value for deaths series', () => {
    const data = {
      dates: [1, 2, 3, 4, 5],
      location: {
        212: {
          name: 'fooyork',
          series: {
            confirmed: [10, 20, 30, 40, 50],
            deaths: [2, 4, 6, 8, 10],
          },
        },
      },
    };
    const result = getDataValue(data, 'deaths', 3);
    expect(result).toEqual(6);
  });
});