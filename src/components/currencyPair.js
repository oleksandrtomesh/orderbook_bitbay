import React from 'react'
import { MenuItem, Select, InputLabel, FormControl, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
    },
});

export const CurrencyPair = ({currencies, pair, setPair}) => {
    const classes = useStyles()

    const handleChange = (event) => {
        setPair(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="currency-pair">Currency Pair</InputLabel>
            <Select
                labelId="currency-pair"
                id="currency-pair"    
                value={pair}
                onChange={handleChange}
                label="currency-pair"
            >
                <MenuItem value={pair}>{pair}</MenuItem>
                {currencies && currencies.map(currency => <MenuItem key={currency} value={currency}>{currency}</MenuItem> )} 
            </Select>
        </FormControl>
    )
}