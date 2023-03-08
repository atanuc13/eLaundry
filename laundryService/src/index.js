const express = require('express');
require('./db/mongoose');
require('dotenv/config');
const laundryRouter = require('./routers/laundry');
const eurekaHelper = require('./eureka-helper');

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(laundryRouter);

app.listen(port, () => {
    console.log('server running on ' + port);
});

eurekaHelper.registerWithEureka('laundry-service', port);