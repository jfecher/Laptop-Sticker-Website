import express from 'express';
const app = express();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/api/', (req, res) => res.json({'req':req}));

app.listen(port, () => console.log('Example app listening on port ' + port));
