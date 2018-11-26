import express from 'express';
import pg from 'pg';
const app = express();
const connectionString = process.env.DATABASE_URL || '';
const client = new pg.Client(connectionString);
client.connect();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/api/:xaxis/:yaxis',
    (req, res) =>
    {
        let queryString = "select " + req.params['xaxis'] + ", avg(" + req.params['yaxis'] + ")" +
                            "from person " +
                            "join " + req.params['xaxis'] + " " +
                            "using (" + req.params['xaxis'] + "_id) limit 5";

        console.log(queryString);
        const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                res.json(result.rows);
            }
        ).catch(
            (err : any) =>
            {
                console.log(err)
            }
        );
    }
);

app.listen(port, () => console.log('Example app listening on port ' + port));
