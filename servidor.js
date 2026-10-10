const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Servidor Atlantis funcionando');
});

app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});

