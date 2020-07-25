import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { BeginDateTime } from "./BeginDateTime";
import { EndDateTime } from "./EndDateTime";
import { KeywordText } from "./KeywordText";
import { TimeZone } from "./TimeZone";
import { searchAndOpen } from "../lib";
import moment, { Moment } from "moment-timezone";
import Typography from '@material-ui/core/Typography';
import { HistoryList } from './History';
import { useReducerWithLocalStorage } from "../state";


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
    const timeZone = "Asia/Tokyo";
    const now = moment().tz(timeZone).toISOString();
    const oneHourLater = moment(now).tz(timeZone).add(1, "hour").toISOString();
    const [state, dispatch] = useReducerWithLocalStorage({
        histories: [], keyword: "", begin: now, end: oneHourLater, timeZone: timeZone
    });
    const classes = props.classes;

    const onKeywordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "setKeyword", payload: { keyword: ev.target.value }});
    };

    const onBeginChange = (date: Moment | null) => {
        if (date === null) {
            date = moment().tz("Asia/Tokyo");
        }
        dispatch({ type: "setBegin", payload: { begin: date.toISOString() }});

        const oneHourLater = moment(date).add(1, "hour");
        dispatch({ type: "setEnd", payload: { end: oneHourLater.toISOString() }});
    };

    const onEndChange = (date: Moment | null) => {
        if (date === null) {
            date = moment().tz("Asia/Tokyo");
        }
        dispatch({ type: "setEnd", payload: { end: date.toISOString() }});
    };

    const onTimeZoneChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
        dispatch({ type: "setTimeZone", payload: { timeZone: ev.target.value as string }});
    };

    const onClick = (ev: React.MouseEvent<HTMLElement, MouseEvent>) => {
        search();
        ev.preventDefault();
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        search();
        ev.preventDefault();
    };

    const search = () => {
        if (typeof window !== 'undefined') {
            dispatch({ type: "appendHistory", payload: {
                history: { keyword: state.keyword, begin: state.begin, end: state.end, timeZone: state.timeZone } } });
        }
        searchAndOpen(state.keyword, state.begin, state.end, state.timeZone);
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
                            <KeywordText value={state.keyword} onChange={onKeywordChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <BeginDateTime value={state.begin} onChange={onBeginChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <EndDateTime value={state.end} onChange={onEndChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TimeZone value={state.timeZone} onChange={onTimeZoneChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} variant={"contained"} color={"primary"} onClick={onClick}>Search</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <HistoryList histories={state.histories} dispatch={dispatch} />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};


export const Main = withStyles(styles)(_Main);
