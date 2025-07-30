import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from "moment-timezone";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)({
    width: "100%",
});

const zoneList = moment.tz.names();

type Props = {
    onChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
    value: string;
};

export const TimeZone: React.FC<Props> = ({ onChange, value }: Props) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        // Convert SelectChangeEvent to the expected format
        const syntheticEvent = {
            target: { value: event.target.value }
        } as React.ChangeEvent<{ value: unknown }>;
        onChange(syntheticEvent);
    };

    return (
        <StyledFormControl margin="normal">
            <InputLabel htmlFor="timezone-input">タイムゾーン</InputLabel>
            <Select
                native
                onChange={handleChange}
                value={value}
                label="タイムゾーン"
                inputProps={{
                    id: "timezone-input"
                }}
            >
                {zoneList.map(name => {
                    return <option key={name} value={name}>{name}</option>
                })}
            </Select>
        </StyledFormControl>
    );
};
