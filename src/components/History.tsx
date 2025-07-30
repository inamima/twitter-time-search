import React from "react";
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';
import { Actions } from "../hooks/useLocalStorageReducer"
import { datetimeToText, searchAndOpen } from "../lib";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

type history = {
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
};

interface Props {
    histories: Array<history>;
    dispatch: (h: Actions) => void;
}

export const HistoryList: React.FC<Props> = ({ histories, dispatch }) => {

    const applyHistory = (h: history): void => {
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
            <ListItem button key={index} onClick={() => applyHistory(h)}>
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
                    <Typography variant="h5" component="h2">検索履歴</Typography>
                </Box>
                <List>{Item}</List>
            </>
        );
    }
};
