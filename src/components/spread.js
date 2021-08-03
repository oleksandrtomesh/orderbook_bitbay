import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';

export const Spread = ({pair}) => {
    const [spread, setSpread] = useState('') 
    useEffect(() => {
        let spread = ''
    const apiCall = async () => {
        await fetch(`https://api.bitbay.net/rest/trading/orderbook-limited/${pair}/10` )
        .then(res => res.json())
        .then(data => {
            if(data.sell[0] && data.buy[0]){
                let sellRate = parseFloat(data.sell[0].ra)
                let buyRate = parseFloat(data.buy[0].ra)
                spread = (( sellRate - buyRate)/((sellRate + buyRate)* 0.5))*100
            }
        })
        setSpread(spread)
    }

    apiCall()   
    }, [pair])
    return(
        <div>
            <Typography>Spread: <b>{Math.floor(spread * 100) / 100}%</b></Typography>
        </div>
    )
}