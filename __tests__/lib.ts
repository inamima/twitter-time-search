import * as lib from "../lib";
import moment from "moment-timezone";


describe.each([
    // Asia/Tokyo
    ['2020-01-01 12:30:00', 'Asia/Tokyo', '2020-01-01_12:30:00_JST'],
    // Amer/New_York
    ['2020-01-01 12:30:00', 'America/New_York', '2020-01-01_12:30:00_EST'],
    // Amer/New_York (daylight saving time)
    ['2020-07-01 12:30:00', 'America/New_York', '2020-07-01_12:30:00_EDT']
])('datetimeToQuery', (date, timezone, expected) => {
    test(`${timezone}`, () => {
        expect(lib.datetimeToQuery(date, timezone)).toBe(expected);
    });
});
