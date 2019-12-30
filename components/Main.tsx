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
import { datetimeToComponent, datetimeToQuery } from "../lib";
import moment from "moment";
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
    const now = moment();
    const oneHourLater = moment(now).add(1, "hour");
    const classes = props.classes;

    const [keyword, setKeyword] = useState("");
    const [begin, setBegin] = useState(datetimeToComponent(now));
    const [end, setEnd] = useState(datetimeToComponent(oneHourLater));
    const [timeZone, setTimeZone] = useState("JST");

    function onKeywordChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setKeyword(ev.target.value);
    }

    function onBeginChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setBegin(ev.target.value);
        const oneHourLater = moment(ev.target.value).add(1, "hour");
        setEnd(datetimeToComponent(oneHourLater));
    }

    function onEndChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setEnd(ev.target.value);
    }

    function onTimeZoneChange(ev: React.ChangeEvent<HTMLInputElement>) {
        setTimeZone(ev.target.value);
    }

    function onClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
        searchAndOpen();
        ev.preventDefault();
    }

    function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
        searchAndOpen();
        ev.preventDefault();
    }

    function searchAndOpen() {
        const keywordQuery = keyword;

        const beginDate = moment.utc(begin);
        const beginQuery = `since:${datetimeToQuery(beginDate, timeZone)}`;

        const endDate = moment.utc(end);
        const endQuery = `until:${datetimeToQuery(endDate, timeZone)}`;

        const query = encodeURIComponent(`${keywordQuery} ${beginQuery} ${endQuery}`);
        window.open("https://twitter.com/search?q=" + query);
    }

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
                        <Grid item xs={12} sm={5}>
                            <BeginDateTime value={begin} onChange={onBeginChange} />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <EndDateTime value={end} onChange={onEndChange} />
                        </Grid>
                        <Grid item xs={12} sm={2}>
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
}

export const Main = withStyles(styles)(_Main);
