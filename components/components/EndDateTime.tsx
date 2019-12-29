import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    endField: {
        width: "100%",
    }
});

interface Props extends WithStyles<typeof styles> {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const _EndDateTime: React.FC<Props> = ({ classes, onChange, value}) => {
    return (
        <TextField
            id=""
            label="End"
            type="datetime-local"
            value={value}
            className={classes.endField}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
        />
    );
}

export const EndDateTime = withStyles(styles)(_EndDateTime);
