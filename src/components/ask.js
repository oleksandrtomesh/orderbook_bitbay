import React from 'react'
import { Offer } from './offer';
import { generateKey } from '../helpers/helpers';
import Typography from '@material-ui/core/Typography'

export const Ask = ({ask, currency}) => {
    
    return(
        <div>
            <Typography variant="h6" color="initial">Ask</Typography>
            {ask.map(offer => {
                return <Offer key={generateKey(offer.ra)} rate={offer.ra} quantity={offer.ca} numberOfOffers={offer.co} currency={currency}/>
            })}
        </div>
    )
}