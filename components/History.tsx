import React from "react";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from '@material-ui/icons/Search';
import { Actions } from "../src/state"
import { datetimeToText, searchAndOpen } from "../src/lib";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'


const styles = createStyles({
    timeZoneField: {
        width: "100%",
    }
});


type history = {
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
};


interface Props extends WithStyles<typeof styles> {
    histories: Array<history>;
    dispatch: (h: Actions) => void;
}


const _HistoryList: React.FC<Props> = ({ histories, dispatch }) => {

    const useHistory = (h: history): void => {
        dispatch({ type: "setKeyword", payload: { keyword: h.keyword }});
        dispatch({ type: "setBegin", payload: { begin: h.begin }});
        dispatch({ type: "setEnd", payload: { end: h.end }});
    };

    const searchHistory = (h: history): void => {
        searchAndOpen(h.keyword, h.begin, h.end, h.timeZone);
    };

    const deleteHistory = (index: number): void => {
        dispatch({ type: "deleteHistory", payload: { index: index }});
    };

    const Item = histories.map((h, index) => {
        return (
            <ListItem button key={index} onClick={() => useHistory(h)}>
                <ListItemText primary={h.keyword} secondary={`${datetimeToText(h.begin)} - ${datetimeToText(h.end)}`}/>
                <ListItemSecondaryAction>
                    <IconButton edge={'start'} onClick={() => searchHistory(h)}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge={'start'} onClick={() => deleteHistory(index)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    if (Item.length === 0) {
        return <></>;
    } else {
        return (
            <>
                <Box pt={3}>
                    <Typography variant={"h5"} component={"h2"}>検索履歴</Typography>
                </Box>
                <List>{Item}</List>
            </>
        );
    }
};


export const HistoryList = withStyles(styles)(_HistoryList);
