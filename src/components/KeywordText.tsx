import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
    width: "100%",
});

type Props = {
    onChange: (ev: React.ChangeEvent<{ value: unknown }>) => void;
    value: string;
};

export const KeywordText: React.FC<Props> = ({ onChange, value }: Props) => {
    return (
        <StyledTextField
            id="standard-name"
            label="検索ワード"
            value={value}
            onChange={onChange}
            margin="normal"
        />
    );
};
