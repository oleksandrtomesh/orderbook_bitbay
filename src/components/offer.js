import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    offer: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#D3D3D3',
        margin: '1rem',
        padding: '1rem'
    },
    values: {
        fontWeight: "bold"
    }

})

export const Offer = ({rate, quantity, numberOfOffers, currency}) => {
    const classes = useStyles()

    return(
        <div className={classes.offer}>
            <div>
                <Typography>Kurs</Typography>
                <Typography className={classes.values}>{rate}</Typography>
            </div>
            <div>
                <Typography>Ilosc {currency}</Typography>
                <Typography className={classes.values}>{quantity}</Typography>
            </div>
            <div>
                <Typography>Wartosc PLN </Typography>
                <Typography className={classes.values}>{Math.floor(rate * quantity * 100) / 100}</Typography>
            </div>
            <div>
                <Typography>Liczba offert</Typography>
                <Typography className={classes.values}>{numberOfOffers}</Typography>
            </div>
            
            
        </div>
    )
}