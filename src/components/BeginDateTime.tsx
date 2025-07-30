import * as React from 'react';
import moment, { Moment } from "moment-timezone";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';

moment.locale("ja");

const StyledDateTimePicker = styled(DateTimePicker)({
    width: "100%",
});

type Props = {
    onChange: (date: Moment | null) => void;
    value: string;
};

export const BeginDateTime: React.FC<Props> = ({ onChange, value }: Props) => {
    const handleChange = (newValue: unknown) => {
        onChange(newValue as moment.Moment | null);
    };

    return (
        <StyledDateTimePicker
            ampm={false}
            format="YYYY/MM/DD HH:mm"
            label="次の時間以降"
            onChange={handleChange}
            value={moment(value)}
            slotProps={{
                textField: {
                    margin: "normal",
                }
            }}
        />
    );
};
