import React, { useState } from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { BeginDateTime } from "./BeginDateTime";
import { EndDateTime } from "./EndDateTime";
import { KeywordText } from "./KeywordText";
import { TimeZone } from "./TimeZone";
import { datetimeToQuery } from "../lib";
import moment, { Moment } from "moment-timezone";
import Typography from '@material-ui/core/Typography';

const styles = ({ breakpoints, palette, spacing }: Theme) => createStyles({
    root: {
        flexGrow: 1,
        paddingTop: 30,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        width: "100%",
        [breakpoints.up("sm")]: {
            width: 600
        },
        marginLeft: "auto",
        marginRight: "auto",
    },
    title: {
        color: "inherit",
        textDecoration: "none",
    },
    paper: {
        padding: spacing(2),
        textAlign: 'center',
        color: palette.text.secondary,
    },
});

interface Props extends WithStyles<typeof styles> {
}

const _Main: React.FC<Props> = (props) => {
    const [timeZone, setTimeZone] = useState("Asia/Tokyo");
    const now = moment().tz(timeZone);

    const oneHourLater = moment(now).tz(timeZone).add(1, "hour");
    const classes = props.classes;

    const [keyword, setKeyword] = useState("");
    const [begin, setBegin] = useState(now);
    const [end, setEnd] = useState(oneHourLater);

    const onKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(ev.target.value);
    };

    const onBeginChange = (date: Moment | null) => {
        if (date === null) {
            date = moment().tz("Asia/Tokyo");
        }
        setBegin(date);

        const oneHourLater = moment(date).add(1, "hour");
        setEnd(oneHourLater);
    };

    const onEndChange = (date: Moment | null) => {
        if (date === null) {
            date = moment().tz("Asia/Tokyo");
        }
        setEnd(date);
    };

    const onTimeZoneChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
        setTimeZone(ev.target.value as string);
    };

    const onClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        searchAndOpen();
        ev.preventDefault();
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        searchAndOpen();
        ev.preventDefault();
    };

    const searchAndOpen = () => {
        const keywordQuery = keyword;
        const beginQuery = `since:${datetimeToQuery(begin, timeZone)}`;
        const endQuery = `until:${datetimeToQuery(end, timeZone)}`;

        const query = encodeURIComponent(`${keywordQuery} ${beginQuery} ${endQuery}`);
        window.open("https://twitter.com/search?q=" + query);
    };

    return (
        <div className={classes.root}>
            <Typography variant={"h4"} component={"h1"}>
                <a href="/" className={classes.title} >Twitter Time Search</a>
            </Typography>
            <Paper className={classes.paper}>
                <form method={"post"} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <KeywordText value={keyword} onChange={onKeywordChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <BeginDateTime value={begin} onChange={onBeginChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <EndDateTime value={end} onChange={onEndChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TimeZone value={timeZone} onChange={onTimeZoneChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} variant={"contained"} color={"primary"} onClick={onClick}>Search</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export const Main = withStyles(styles)(_Main);
