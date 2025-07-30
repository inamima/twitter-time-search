import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BeginDateTime } from "./BeginDateTime";
import { EndDateTime } from "./EndDateTime";
import { KeywordText } from "./KeywordText";
import { TimeZone } from "./TimeZone";
import { searchAndOpen } from "../lib";
import moment, { Moment } from "moment-timezone";
import { HistoryList } from './History';
import { useReducerWithLocalStorage } from "../hooks/useLocalStorageReducer";
import { Usage } from './Usage';

const Root = styled('div')(({ theme }) => ({
    flexGrow: 1,
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: 600
    },
    marginLeft: "auto",
    marginRight: "auto",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const TitleLink = styled('a')({
    color: "inherit",
    textDecoration: "none",
});

export const Main: React.FC = () => {
    const timeZone = "Asia/Tokyo";
    const now = moment().tz(timeZone).toISOString();
    const oneHourLater = moment(now).tz(timeZone).add(1, "hour").toISOString();
    const [state, dispatch] = useReducerWithLocalStorage({
        histories: [], keyword: "", begin: now, end: oneHourLater, timeZone: timeZone
    });

    const onKeywordChange = (ev: React.ChangeEvent<{ value: unknown}>) => {
        dispatch({ type: "setKeyword", payload: { keyword: ev.target.value as string}});
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Root>
                <Typography variant="h4" component="h1">
                    <TitleLink href="/">Twitter Time Search</TitleLink>
                </Typography>
                <Usage/>
                <StyledPaper>
                    <form method="post" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <KeywordText value={state.keyword} onChange={onKeywordChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <BeginDateTime value={state.begin} onChange={onBeginChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <EndDateTime value={state.end} onChange={onEndChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TimeZone value={state.timeZone} onChange={onTimeZoneChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" onClick={onClick}>検索</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <HistoryList histories={state.histories} dispatch={dispatch} />
                            </Grid>
                        </Grid>
                    </form>
                </StyledPaper>
            </Root>
        </LocalizationProvider>
    );
};
