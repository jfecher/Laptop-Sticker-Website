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
        var queryString = '';
        if (req.params['xaxis'] == 'hometown_location')
        {
            queryString = "select location.name, avg(" + req.params['yaxis'] + ") " +
                            "from person " +
                            "join location " +
                            "on (hometown_location_id = location_id) " +
                            "group by location.name " +
                            "limit 5;";
        }
        else
        {
            queryString = "select " + req.params['xaxis'] + ".name, avg(" + req.params['yaxis'] + ") " +
                            "from person " +
                            "join " + req.params['xaxis'] + " " +
                            "using (" + req.params['xaxis'] + "_id) " +
                            "group by " + req.params['xaxis'] + ".name " +
                                "limit 5;";
        }

        console.log(queryString);
        const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'xValues':[], 'yValues':[]};
                result.rows.forEach(
                    (pair : any) =>
                    {
                        toBeSent.xValues.push(pair.name);
                        toBeSent.yValues.push(Number(pair.avg));
                    }
                );
                res.json(toBeSent);
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
