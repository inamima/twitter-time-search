import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    beginField: {
        width: "100%",
    }
});

interface Props extends WithStyles<typeof styles> {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const _BeginDateTime: React.FC<Props> = ({ classes, onChange, value}) => {
    return (
        <TextField
            id=""
            label="Begin"
            type="datetime-local"
            value={value}
            className={classes.beginField}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
        />
    );
}

export const BeginDateTime = withStyles(styles)(_BeginDateTime);
