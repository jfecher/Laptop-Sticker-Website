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
        const needsMajorJoin = req.param('xaxis') == 'major' || req.param('xaxis') == 'major';
        let queryString = "select * from person";
        if (needsMajorJoin)
        {
            queryString += " join major using (major_id)"
        }
        queryString += " limit 5;";
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
