import express from 'express';
import pg from 'pg';
const app = express();
const connectionString = process.env.DATABASE_URL || '';
const client = new pg.Client(connectionString);
client.connect();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/api/', (req, res) => res.json({'xaxis':req.param('xaxis'), 'yaxis':req.param('yaxis')}));

app.listen(port, () => console.log('Example app listening on port ' + port));
