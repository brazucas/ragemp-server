mp.events.add("cliente:logEscrever", (line) => {
    mp.console.logInfo(line, true, true);
});