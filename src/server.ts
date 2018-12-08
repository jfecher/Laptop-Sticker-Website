import express from 'express';
import pg from 'pg';
const app = express();
const connectionString = process.env.DATABASE_URL || '';
const client = new pg.Client(connectionString);
client.connect();


//set up for cross origin

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://drive.google.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Pass to next layer of middleware
    next();
});






var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/stickerAnalytics', (req, res) => res.sendFile(__dirname + '/stickerAnalytics.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/about.html'));
app.get('/gallery', (req, res) => res.sendFile(__dirname + '/gallery.html'));
app.get('/:scriptName.js', (req, res) => res.sendFile(__dirname + '/' + req.params['scriptName'] + '.js'));
app.get('/:pictureName.png', (req, res) => res.sendFile(__dirname + '/' + req.params['pictureName'] + '.png'));

//----Home--------
app.get('/api/countTable/:tableName', (req, res) => {
    var queryString = "select count(*) from " + req.params["tableName"];
    const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'numRecords': 0};
                result.rows.forEach(
                    (num : any) =>
                    {
                        toBeSent.numRecords = num;
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
    var queryString = "select person_id, laptop_picture_url from person where person_id in (select person_id from person_has_sticker) order by rand() limit 10";
    const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'laptop_picture_urls': []};
                result.rows.forEach(url =>
                    toBeSent.laptop_picture_urls.push(url.laptop_picture_url)
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


//--------Sticker Analytics------------
app.get('/api/:xaxis/:yaxis/:sort',
    (req, res) =>
    {
        var joins = "";
        var yAxis = "";
        var xAxis = "";
        var sort = "";
        var queryString = "";


        if (req.params['xaxis'] == "major")
        {
            joins = " join major using (major_id) ";
            xAxis = " major.name "
        }
        if (req.params['xaxis'] == "hometown_location")
        {
            joins = " join hometown_location on (person.hometown_location_id = hometown_location.location_id and hometown_location.state != null) ";
            xAxis = " hometown_location.state ";
        }
        if (req.params['xaxis'] == "laptop")
        {
            joins = " join laptop using (laptop_id) ";
            xAxis = " laptop.brand ";
        }


        if (req.params['yaxis'] == "likelihood_to_buy_more")
        {
            yAxis = " avg(person.likelihood_to_buy_more) ";
        }
        if (req.params['yaxis'] == "likelihood_to_put_more")
        {
            yAxis = " avg(person.likelihood_to_put_more) ";
        }
        if (req.params['yaxis'] == "numStickers")
        {
            yAxis = " count(person_has_sticker.sticker_id) / count(person_has_sticker.person_id) ";
            joins += " join person_has_sticker using (person_id) ";
            joins += " join sticker using (sticker_id) ";
        }

        sort = req.params['sort'];





        queryString = " select " + xAxis + " as xAxis , " + yAxis + " as yAxis " +
                        " from person " +
                        joins +
                        " group by " + xAxis +
                        " having count( " + xAxis + " ) > 1 " +
                        " order by yAxis " + sort +
                        " limit 12;";

        console.log(queryString);


        console.log(queryString);
        const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'xValues':[], 'yValues':[]};
                result.rows.forEach(
                    (pair : any) =>
                    {
                        toBeSent.xValues.push(pair.xaxis);
                        toBeSent.yValues.push(Number(pair.yaxis));
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
