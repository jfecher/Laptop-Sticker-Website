import express from 'express';
import pg from 'pg';
const app = express();
const connectionString = process.env.DATABASE_URL || '';
const client = new pg.Client(connectionString);
client.connect();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/api/',
    (req, res) =>
    {
        //const needsMajorJoin = req.param('xaxis') == 'major' || req.param('xaxis') == 'major';
        let queryString = "select " + req.param('xaxis') + ", avg(" + req.param('yaxis') + ")" +
                            "from person " +
                            "join " + req.param('xaxis') + " " +
                            "using (" + req.param('xaxis') + "_id) limit 5";

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
