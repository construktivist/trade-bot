const init = async () => {

    const checkAndOrder  = async () => {

        const oneMinuteMS = 60000;
        const now = new Date();
        const start = new Date(now - (2 * oneMinuteMS)).toISOString();
        const end = new Date(now - oneMinuteMS).toISOString();
        console.log('Checking bars', end, start);
        const bars = wait getBars((symbol, start, end));
        const bar1 = bars[symbol[0]];
        const bar2 = bars[symbol[1]];
    }

    checkAndOrder();

}
init();