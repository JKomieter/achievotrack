const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});

module.exports = app;