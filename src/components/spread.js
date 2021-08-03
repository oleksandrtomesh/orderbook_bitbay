import React from 'react'
import { Typography } from '@material-ui/core';

export const Spread = ({spread}) => {
    return(
        <div>
            <Typography>Spread: <b>{Math.floor(spread * 100) / 100}</b></Typography>
        </div>
    )
}