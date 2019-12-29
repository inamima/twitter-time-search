import * as moment from "moment";

export function datetimeToComponent(date: moment.Moment): string {
    return date.format("YYYY-MM-DDTHH:mm");
}

export function datetimeToQuery(date: moment.Moment, timeZoneSuffix: string): string {
    return `${date.format("YYYY-MM-DD_HH:mm:ss")}_${timeZoneSuffix}`;
}
