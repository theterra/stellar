export default (app) => {
    const port = normalizePort(process.env.PORT || '3000');
    // Set IP and port
    app.set('ipaddr', app.host);
    app.set('port', app.port);

    app.listen(port, app.host, () => {
        console.log(`listening on port ${port}`);
    });
};

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
};
