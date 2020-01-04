import moment from "moment-timezone";

export function datetimeToQuery(date: moment.Moment, timeZoneSuffix: string): string {
    return `${date.format("YYYY-MM-DD_HH:mm:ss")}_${timeZoneSuffix}`;
}
