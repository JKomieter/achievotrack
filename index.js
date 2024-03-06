const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(router);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});