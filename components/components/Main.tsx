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
import { datetimeToComponent, datetimeToQuery } from "../lib";
import * as moment from "moment";
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
        padding: spacing.unit * 2,
        textAlign: 'center',
        color: palette.text.secondary,
    },
});

interface Props extends WithStyles<typeof styles> {
}

interface State {
    keyword: string;
    begin: string;
    end: string;
    timeZone: string
}

class _Main extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const now = moment();
        const oneHourLater = moment(now).add(1, "hour");

        this.state = {
            keyword: "",
            begin: datetimeToComponent(now),
            end: datetimeToComponent(oneHourLater),
            timeZone: "JST",
        };

        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onBeginChange = this.onBeginChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.onTimeZoneChange = this.onTimeZoneChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onKeywordChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ keyword: ev.target.value });
    }

    onBeginChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ begin: ev.target.value });
        const oneHourLater = moment(ev.target.value).add(1, "hour");
        this.setState({ end: datetimeToComponent(oneHourLater) });
    }

    onEndChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ end: ev.target.value });
    }

    onTimeZoneChange(ev: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ timeZone: ev.target.value });
    }

    onClick(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
        this.searchAndOpen();
        ev.preventDefault();
    }

    handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
        this.searchAndOpen();
        ev.preventDefault();
    }

    searchAndOpen() {
        const keywordQuery = this.state.keyword;

        const beginDate = moment.utc(this.state.begin);
        const beginQuery = `since:${datetimeToQuery(beginDate, this.state.timeZone)}`;

        const endDate = moment.utc(this.state.end);
        const endQuery = `until:${datetimeToQuery(endDate, this.state.timeZone)}`;

        const query = encodeURIComponent(`${keywordQuery} ${beginQuery} ${endQuery}`);
        window.open("https://twitter.com/search?q=" + query);
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Typography variant={"h4"} component={"h1"}>
                    <a href="/" className={classes.title} >Twitter Time Search</a>
                </Typography>
                <Paper className={classes.paper}>
                    <form method={"post"} onSubmit={this.handleSubmit}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <KeywordText value={this.state.keyword} onChange={this.onKeywordChange} />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <BeginDateTime value={this.state.begin} onChange={this.onBeginChange} />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <EndDateTime value={this.state.end} onChange={this.onEndChange} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TimeZone value={this.state.timeZone} onChange={this.onTimeZoneChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type={"submit"} variant={"contained"} color={"primary"} onClick={this.onClick}>Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

export const Main = withStyles(styles)(_Main);
