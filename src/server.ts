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
            yAxis = " person.likelihood_to_buy_more ";
        }
        if (req.params['yaxis'] == "likelihood_to_put_more")
        {
            yAxis = " person.likelihood_to_put_more ";
        }
        if (req.params['yaxis'] == "num_stickers")
        {
            yAxis  = " count(person_has_sticker.person_id) ";
            joins = " join person_has_sticker using (person_id) ";
            joins += " join sticker using (sticker_id) ";
        }

        sort = req.params['sort'];





        queryString = " select " + xAxis + " as xAxis , " + yAxis + " as yAxis "
                        " from person " +
                        joins +
                        " group by " + xAxis +
                        " order by yAxis " + sort +
                        " limit 6;";

        console.log(query);


        console.log(queryString);
        const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                let toBeSent : any = {'xValues':[], 'yValues':[]};
                result.rows.forEach(
                    (pair : any) =>
                    {
                        toBeSent.xValues.push(pair.xAxis);
                        toBeSent.yValues.push(Number(pair.yAxis));
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
