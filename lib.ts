import moment from "moment-timezone";

export function datetimeToQuery(date: moment.Moment, timezone: string): string {
    const abbreviatedZoneName = moment.tz(date, timezone).zoneAbbr();
    return `${date.format("YYYY-MM-DD_HH:mm:ss")}_${abbreviatedZoneName}`;
}
