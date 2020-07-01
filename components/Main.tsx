import React, {Dispatch, Reducer, ReducerAction, useEffect, useReducer} from 'react';
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


type history = {
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
};


type state = {
    histories: Array<history>;
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
}


interface setKeywordAction {
    type: "setKeyword";
    payload: {
        keyword: string;
    }
}


interface historyAppendAction {
    type: "appendHistory";
    payload: {
        history: history;
    };
}


interface historyDeleteAction {
    type: "deleteHistory";
    payload: {
        index: number;
    };
}


interface setBeginAction {
    type: "setBegin";
    payload: {
        begin: string;
    }
}


interface setEndAction {
    type: "setEnd";
    payload: {
        end: string;
    }
}


interface setTimeZoneAction {
    type: "setTimeZone";
    payload: {
        timeZone: string;
    }
}


export type Actions = (
    | setKeywordAction
    | historyAppendAction
    | historyDeleteAction
    | setBeginAction
    | setEndAction
    | setTimeZoneAction
);


const MAX_HISTORY = 10;


const reducer = (state: state, action: Actions): state => {
    switch (action.type) {
        case "setKeyword":
            return {...state, keyword: action.payload.keyword};
        case "appendHistory":
            let newHistories = [action.payload.history, ...state.histories];
            if (newHistories.length > MAX_HISTORY) {
                newHistories.splice(-1, 1);
            }
            return {...state, histories: newHistories};
        case "deleteHistory":
            state.histories.splice(action.payload.index, 1);
            return {...state, histories: [...state.histories]};
        case "setBegin":
            return {...state, begin: action.payload.begin};
        case "setEnd":
            return {...state, end: action.payload.end};
        case "setTimeZone":
            return {...state, timeZone: action.payload.timeZone};
    }
};


const useReducerWithLocalStorage = (reducer: (state: state, action: Actions) => state, initializerArg: state): [state, Dispatch<ReducerAction<Reducer<state, Actions>>>] => {
    const localStorageKey = "twitter-time-search";
    const [state, dispatch] = useReducer(reducer, initializerArg, (initializeArg) => {
        if (typeof localStorage !== "undefined") {
            const item = localStorage.getItem(localStorageKey);
            return item ? JSON.parse(item) : initializeArg;
        } else {
            return initializeArg;
        }
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    });

    return [state, dispatch]
};


const _Main: React.FC<Props> = (props) => {
    const timeZone = "Asia/Tokyo";
    const now = moment().tz(timeZone).toISOString();
    const oneHourLater = moment(now).tz(timeZone).add(1, "hour").toISOString();
    const [state, dispatch] = useReducerWithLocalStorage(reducer, {
        histories: [], keyword: "", begin: now, end: oneHourLater, timeZone: timeZone });
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
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        search();
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
                            <Button type={"button"} variant={"contained"} color={"primary"} onClick={onClick}>Search</Button>
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
