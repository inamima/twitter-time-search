import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    timeZoneField: {
        width: "100%",
    }
});

interface Props extends WithStyles<typeof styles> {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const _TimeZone: React.FC<Props> = ({ classes, onChange, value }) => {
    return (
        <TextField
            id=""
            label="TimeZone"
            className={classes.timeZoneField}
            value={value}
            onChange={onChange}
            margin="normal"
        />
    );
};

export const TimeZone = withStyles(styles)(_TimeZone);
