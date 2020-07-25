import * as React from 'react';
import moment, { Moment } from "moment-timezone";
import MomentUtils from '@date-io/moment'
import { DateTimePicker, MuiPickersUtilsProvider,  } from '@material-ui/pickers'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

moment.locale("ja");

const styles = createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    beginField: {
        width: "100%",
    }
});


type Props = WithStyles<typeof styles>
    & { onChange: (date: Moment | null) => void }
    & { value: string };


const _BeginDateTime: React.FC<Props> = ({ classes, onChange, value}: Props) => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
                ampm={false}
                className={classes.beginField}
                format={'YYYY/MM/DD HH:mm'}
                label="次の時間以降"
                margin={"normal"}
                onChange={onChange}
                value={value}
            />
        </MuiPickersUtilsProvider>
    );
};

export const BeginDateTime = withStyles(styles)(_BeginDateTime);
