const express = require('express');
const path = require('path');

const app = express();

const folder = path.join(__dirname, 'src');
const port = process.env.PORT || 3000;

app.use(express.static(folder));

app.get('/de', (req, res) => {
    res.send(path.join(__dirname, 'i.html'));
})

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})