import { Container, Grid, Paper } from '@material-ui/core';
import { CurrencyPair } from './components/currencyPair';
import { makeStyles } from '@material-ui/core';
import { Spread } from './components/spread';
import { MinMax } from './components/minMax';
import { Bid } from './components/bid';
import { Ask } from './components/ask';
import { useEffect, useState } from 'react';
import './index.css';
import { updateList } from './helpers/helpers';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#D3D3D3',
  },
  column: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',

  }
})

function App() {
  const classes = useStyles()

  const [currencies, setCurrencies] = useState('')
  const [pair, setPair] = useState('BTC-PLN') 
  const [snapshotBuy, setSnapshotBuy] = useState([])
  const [snapshotSell, setSnapshotSell] = useState([])
  const [currency, setCurrency] = useState('')
  const url = 'https://api.bitbay.net/rest/trading/'
  
  //first render, get currencies pairs
  useEffect(() => {
    let pairs = []
    const apiCall = async () => {
      await fetch(url + 'ticker')
        .then(res => res.json())
        .then(data => {
          pairs = Object.keys(data.items)
            .filter(pair => /PLN/.test(pair))
            .sort()
        })
      setCurrencies(pairs)
    }

    apiCall()
  }, [])

  //subscribe orderbook-limited
  useEffect(() => {
    let ws = new WebSocket('wss://api.bitbay.net/websocket/')

    ws.onopen = () => ws.send(JSON.stringify({
      "action": "subscribe-public",
      "module": "trading",
      "path": `orderbook-limited/${pair}/10`
    }))


    ws.onmessage = evt => {
      let data = JSON.parse(evt.data)
      if (data.action === 'push') {
        data.message.changes.forEach(change => {
          updateList(change, setSnapshotBuy, setSnapshotSell)
        })
      }
    }
    
    return (() => {
      if (ws.OPEN && !ws.CONNECTING) {
        ws.send(JSON.stringify({
          "action": "subscribe-public",
          "module": "trading",
          "path": `orderbook-limited/${pair}/10`
        }))
        ws.close()
      }
    })

  }, [pair])

  //make snapshot 
  useEffect(() => {

    let ws = new WebSocket('wss://api.bitbay.net/websocket/')

    ws.onopen = () => ws.send(JSON.stringify({
      "requestId": "78539fe0-e9b0-4e4e-8c86-70b36aa93d4f",
      "action": "proxy",
      "module": "trading",
      "path": `orderbook-limited/${pair}/10`
    }))

    ws.onmessage = evt => {
      let data = JSON.parse(evt.data)
      setSnapshotBuy(data.body.buy)
      setSnapshotSell(data.body.sell)
    }

    setCurrency(pair.split('-')[0])

    return (() => {
      if (ws.OPEN && !ws.CONNECTING) {
        ws.send(JSON.stringify({
          "requestId": "78539fe0-e9b0-4e4e-8c86-70b36aa93d4f",
          "action": "proxy",
          "module": "trading",
          "path": `orderbook-limited/${pair}/10`
        }))
        ws.close()
      }
    })
  }, [pair])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.header} variant="outlined" square>
            <CurrencyPair currencies={currencies} setPair={setPair} pair={pair} />
            <Spread pair={pair}/>
            <MinMax url={url} pair={pair} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.column} variant="outlined" square>
            <Bid pair={pair} bid={snapshotBuy} currency={currency} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.column} variant="outlined" square >
            <Ask pair={pair} ask={snapshotSell} currency={currency} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
