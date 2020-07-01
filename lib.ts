import moment from "moment-timezone";


export function datetimeToQuery(date: string, timezone: string): string {
    const momentDate = moment(date);
    const abbreviatedZoneName = moment.tz(momentDate, timezone).zoneAbbr();
    return `${momentDate.format("YYYY-MM-DD_HH:mm:ss")}_${abbreviatedZoneName}`;
}


export const datetimeToText = (date: string): string => {
    return `${moment(date).format("YYYY/MM/DD HH:mm")}`;
};


export const searchAndOpen = (keyword: string, begin: string, end: string, timeZone: string) => {
    const keywordQuery = keyword;
    const beginQuery = `since:${datetimeToQuery(begin, timeZone)}`;
    const endQuery = `until:${datetimeToQuery(end, timeZone)}`;

    const query = encodeURIComponent(`${keywordQuery} ${beginQuery} ${endQuery}`);
    window.open("https://twitter.com/search?q=" + query);
};
