import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.primary,
}));
