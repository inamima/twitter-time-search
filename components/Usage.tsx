import React from "react";
import {createStyles, withStyles, WithStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'

const styles = () => createStyles({});

interface Props extends WithStyles<typeof styles> {}


const _Usage: React.FC<Props> = () => {
    return (
        <Box pt={2} pb={2}>
            Twitterで年/月/日/時/分を指定した検索を行いやすくするツール。
        </Box>
    );
};


export const Usage = withStyles(styles)(_Usage);
