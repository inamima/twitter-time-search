import * as lib from "../lib";
import moment from "moment-timezone";


describe('datetimeToQuery', () => {
    test('JST', () => {
        const date = moment.tz('2020-01-01 12:30:00', 'Asia/Tokyo');
        expect(lib.datetimeToQuery(date, 'JST')).toBe('2020-01-01_12:30:00_JST');
    });

    test('EST', () => {
        const date = moment.tz('2020-01-01 12:30:00', 'America/New_York');
        expect(lib.datetimeToQuery(date, 'EST')).toBe('2020-01-01_12:30:00_EST');
    });
});