import React from 'react'
import { Typography } from '@material-ui/core';

export const MinMax = ({min, max}) => {
    return(
        <div>
            <div>
                <Typography>Min: <b>{min}</b></Typography>
                <Typography>Max: <b>{max}</b></Typography>
            </div>
        </div>
    )
}