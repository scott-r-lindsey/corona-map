
import {
  getTrimmedData,
  parseWhen,
  getDate,
  getDataValue,
  getDataValueById,
} from './getMapValue';

const data = {
  dates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  location: {
    212: {
      name: 'fooyork',
      series: {
        confirmed: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        deaths: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      },
    },
  },
};

const clone = (parent) => JSON.parse(JSON.stringify(parent));
const dataBak = clone(data);

// ----------------------------------------------------------------------------


// export const getDataValue = (data, when, location, axis, addl = 0) => {

describe('getDataValueById', () => {
  it('fetches a date value for "now"', () => {
    const ret = getDataValueById(data, 'now', 212, 'confirmed');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(100);
  });

  it('fetches a date value for "-2"', () => {
    const ret = getDataValueById(data, '-2', 212, 'confirmed');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(80);
  });

  it('fetches a date value for "4-5", with addl -1', () => {
    const ret = getDataValueById(data, '4-9', 212, 'deaths', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(18);
  });
});

describe('getDataValue', () => {
  it('fetches a date value for "now"', () => {
    const ret = getDataValue(data, 'now', 'fooyork', 'confirmed');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(100);
  });

  it('fetches a date value for "now" -1', () => {
    const ret = getDataValue(data, 'now', 'fooyork', 'confirmed', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(90);
  });

  it('fetches a date value for "-2"', () => {
    const ret = getDataValue(data, '-2', 'fooyork', 'confirmed');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(80);
  });

  it('fetches a date value for "4-5", with addl -1', () => {
    const ret = getDataValue(data, '4-9', 'fooyork', 'deaths', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(18);
  });
});

describe('getDate', () => {
  it('fetches the date for "now"', () => {
    const ret = getDate(data, 'now');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(10);
  });

  it('fetches the date for "-9"', () => {
    const ret = getDate(data, '-9');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(1);
  });

  it('fetches the date for "2-4"', () => {
    const ret = getDate(data, '2-4');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual(5);
  });
});

describe('getTrimmedData', () => {
  it('parses "now"', () => {
    const ret = getTrimmedData(data, 'now');

    expect(data).toEqual(dataBak);
    expect(ret).toEqual({
      ...data,
      ...{ raw: data },
    });
  });

  it('parses but ignores 2-2', () => {
    const ret = getTrimmedData(data, '2-2');

    expect(data).toEqual(dataBak);
    expect(ret).toEqual({
      ...data,
      ...{ raw: data },
    });
  });

  it('parses but ignores 3-2', () => {
    const ret = getTrimmedData(data, '3-2');

    expect(data).toEqual(dataBak);
    expect(ret).toEqual({
      ...data,
      ...{ raw: data },
    });
  });

  it('parses -2', () => {
    const ret = getTrimmedData(data, '-8');

    expect(data).toEqual(dataBak);
    expect(ret).toEqual({
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

  it('parses 2-4', () => {
    const ret = getTrimmedData(data, '2-4');

    expect(data).toEqual(dataBak);
    expect(ret).toEqual({
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

describe('parseWhen', () => {
  it('parses "now"', () => {
    const ret = parseWhen(data, 'now');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([0, 9]);
  });

  it('parses "now" -1', () => {
    const ret = parseWhen(data, 'now', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([-1, 8]);
  });

  it('parses "foo"', () => {
    const ret = parseWhen(data, 'now');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([0, 9]);
  });

  it('parses -2', () => {
    const ret = parseWhen(data, '-2');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([0, 7]);
  });

  it('parses -2, with addl -1', () => {
    const ret = parseWhen(data, '-2', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([-1, 6]);
  });

  it('parses 1-2', () => {
    const ret = parseWhen(data, '1-2');
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([1, 2]);
  });

  it('parses 2-3, with addl -1', () => {
    const ret = parseWhen(data, '2-3', -1);
    expect(data).toEqual(dataBak);
    expect(ret).toEqual([1, 2]);
  });
});
