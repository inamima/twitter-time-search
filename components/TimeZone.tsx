import * as React from 'react';
import Select from '@material-ui/core/Select';
import moment from "moment-timezone";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    timeZoneField: {
        width: "100%",
    }
});

const zoneList = moment.tz.names();


type Props = WithStyles<typeof styles>
    & { onChange: (ev: React.ChangeEvent<{ value: unknown }>) => void }
    & { value: string };


const _TimeZone: React.FC<Props> = ({ classes, onChange, value }: Props) => {
    return (
        <FormControl
            margin="normal"
            className={classes.timeZoneField}
        >
            <InputLabel htmlFor="timezone-input">タイムゾーン</InputLabel>
            <Select
                native
                onChange={onChange}
                className="timezone"
                value={value}
                inputProps={{
                    id: "timezone-input"
                }}
            >
                {zoneList.map(name => {
                    return <option key={name} value={name}>{name}</option>
                })}
            </Select>
        </FormControl>
    );
};

export const TimeZone = withStyles(styles)(_TimeZone);
