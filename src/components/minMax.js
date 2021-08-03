import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';

export const MinMax = ({ url, pair }) => {
    const [stats, setStats] = useState({})

    //get stats
    useEffect(() => {
        let stats = {}
        const apiCall = async () => {
            await fetch(url + `stats/${pair}`)
                .then(res => res.json())
                .then(data => {
                    stats = data.stats
                })
            setStats(stats)
        }
        apiCall()
    }, [pair, url])

    return (
        <div>
            <div>
                <Typography>Min: <b>{stats.l}</b></Typography>
                <Typography>Max: <b>{stats.h}</b></Typography>
            </div>
        </div>
    )
}