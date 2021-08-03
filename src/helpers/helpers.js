export const changeList = (change, setSnapshotBuy, setSnapshotSell) => {
    //change list depend of push entry type and push action
    if (change.entryType === "Buy" && change.action === "remove") {
        //delete remove entry
        setSnapshotBuy((prevState) => {
            const newState = prevState.filter(item => item.ra !== change.rate).sort(compare)
            return newState
        })

    } else if (change.entryType === "Buy" && change.action === "update") {
        //depends on rate, change entry or add new entry on the list
        setSnapshotBuy((prevState) => {
            if (prevState.some(item => item.ra === change.rate)) {
                return prevState.map((item) => {
                    if (item.ra === change.rate) {
                        return change.state
                    }
                    return item
                }).sort(compare)
            } else {
                return [...prevState, change.state].sort(compare)
            }

        })
    //the same actions for sell like for buy entry type
    } else if (change.entryType === "Sell" && change.action === "remove") {

        setSnapshotSell((prevState) => {
            const newState = prevState.filter(item => item.ra !== change.rate).sort(compare)
            return newState
        })

    } else if (change.entryType === "Sell" && change.action === "update") {

        setSnapshotSell((prevState) => {
            if (prevState.some(item => item.ra === change.rate)) {
                return prevState.map((item) => {
                    if (item.ra === change.rate) {
                        return change.state
                    }
                    return item
                }).sort(compare)
            } else {
                return [...prevState, change.state].sort(compare)
            }
        })
    }
}

function compare(a, b) {
    if (a.ra < b.ra) {
        return -1;
    }
    if (a.ra > b.ra) {
        return 1;
    }
    return 0;
}

export const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}