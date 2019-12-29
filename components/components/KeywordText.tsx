import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    keywordField: {
        width: "100%",
    }
});

interface Props extends WithStyles<typeof styles> {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const _KeywordText: React.FC<Props> = ({ classes, onChange, value }) => {
    return (
        <TextField
            id="standard-name"
            label="Keyword"
            className={classes.keywordField}
            value={value}
            onChange={onChange}
            margin="normal"
        />
    );
}

export const KeywordText = withStyles(styles)(_KeywordText);
