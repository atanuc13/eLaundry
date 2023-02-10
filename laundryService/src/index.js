const express = require('express');
require('./db/mongoose');
const laundryRouter = require('./routers/laundry');

const app = express();
const port = process.env.port || 4001;

app.use(express.json());
app.use(laundryRouter);

app.listen(port, () => {
    console.log('server running on ' + port);
});