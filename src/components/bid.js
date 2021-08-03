import { Typography } from '@material-ui/core'
import React from 'react'
import { Offer } from './offer'
import { generateKey } from '../helpers/helpers';


export const Bid = ({ bid, currency }) => {
    return (
        <div>
            <Typography variant='h6'>Bid</Typography>
            {bid.map(offer => {
                return <Offer key={generateKey(offer.ra)} rate={offer.ra} quantity={offer.ca} numberOfOffers={offer.co} currency={currency}/>
            })}
        </div>
    )
}