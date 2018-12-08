import express from 'express';
import pg from 'pg';
const app = express();
const connectionString = process.env.DATABASE_URL || '';
const client = new pg.Client(connectionString);
client.connect();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/stickerAnalytics', (req, res) => res.sendFile(__dirname + '/stickerAnalytics.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/about.html'));
app.get('/gallery', (req, res) => res.sendFile(__dirname + '/gallery.html'));
app.get('/:scriptName.js', (req, res) => res.sendFile(__dirname + '/' + req.params['scriptName'] + '.js'));
app.get('/:pictureName.png', (req, res) => res.sendFile(__dirname + '/' + req.params['pictureName'] + '.png'));

//----Home--------
app.get('/api/numPeople', (req, res) => {
    var queryString = "select count(*) from person";
    const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'numPeople': 0};
                result.rows.forEach(
                    (num : any) =>
                    {
                        toBeSent.numPeople = num;
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


//----------------------------
app.get('/api/getStickerUrls', (req, res) => {
    var queryString = "select laptop_picture_url from person";
    const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'laptop_picture_urls': []};
                toBeSent.laptop_picture_urls = result.rows;
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


//--------Sticker Analytics------------
app.get('/api/:xaxis/:yaxis',
    (req, res) =>
    {
        var joins = "";
        var yaxisFunc = 'avg';
        if (req.params['yaxis'] == 'brand.name')
        {
            yaxisFunc = 'count';
            joins = " join person_has_sticker using (person_id) " +
                    " join sticker using (sticker_id) " +
                    " join brand using (brand_id) ";
        }
        var queryString = '';
        if (req.params['xaxis'] == 'hometown_location')
        {
            queryString = "select location.name, " + yaxisFunc + "(" + req.params['yaxis'] + ") " +
                            " from person " +
                            " join location " +
                            " on (hometown_location_id = location_id) " +
                            joins +
                            " group by location.name " +
                            " limit 5;";
        }
        else if (req.params['xaxis'] == 'laptop')
        {
            queryString = "select laptop.brand as name, " + yaxisFunc + "(" + req.params['yaxis'] + ") " +
                            "from person " +
                            "join laptop " +
                            "using (laptop_id) " +
                            joins +
                            "group by laptop.brand " +
                            "limit 5;";
        }
        else
        {
            queryString = "select " + req.params['xaxis'] + ".name, " + yaxisFunc + "(" + req.params['yaxis'] + ") " +
                            "from person " +
                            "join " + req.params['xaxis'] + " " +
                            "using (" + req.params['xaxis'] + "_id) " +
                            joins +
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
