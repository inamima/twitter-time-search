import * as React from 'react';
import moment, { Moment } from 'moment-timezone'
import MomentUtils from '@date-io/moment'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider,  } from '@material-ui/pickers'

moment.locale("ja");

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
    onChange: (date: Moment | null) => void;
    value: string;
}

const _EndDateTime: React.FC<Props> = ({ classes, onChange, value}) => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
                ampm={false}
                className={classes.endField}
                format={'YYYY/MM/DD HH:mm'}
                label="次の時間以前"
                margin={"normal"}
                onChange={onChange}
                value={value}
            />
        </MuiPickersUtilsProvider>
    );
};

export const EndDateTime = withStyles(styles)(_EndDateTime);
