import express from 'express';
import pg from 'pg';
const app = express();

//Connecting to database
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

//Routing using ExpressJS for loading scripts and pages and pcitures
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/stickerAnalytics', (req, res) => res.sendFile(__dirname + '/stickerAnalytics.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/about.html'));
app.get('/gallery', (req, res) => res.sendFile(__dirname + '/gallery.html'));
app.get('/:scriptName.js', (req, res) => res.sendFile(__dirname + '/' + req.params['scriptName'] + '.js'));
app.get('/:pictureName.png', (req, res) => res.sendFile(__dirname + '/' + req.params['pictureName'] + '.png'));

//----Home--------

/**
 * Queries the number of records in any given table
 * @param tableName name of table you want to count records from
 */
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
                console.log(err);
            }
        );
    }
);


/**
 * Queries you to count the amount of people that have stickers
 */
app.get('/api/peopleHadStickers', (req, res) => {
    var queryString = "select count(distinct person_id) from person_has_sticker;"
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

/**
 * Queries the average amount of sticker on each persons laptop
 */
app.get('/api/avgStickers', (req, res) => {
    var queryString = "select round(count(sticker_id)::decimal / count(distinct person_id)::decimal, 2) as totalAvg" +
                        " from person " +
                        " left join person_has_sticker using (person_id) " +
                        " order by totalAvg  desc;";
    const query = client.query(queryString);

    query.then(
        (result : any) =>
        {
            let toBeSent : any = {'avg': 0};
            result.rows.forEach(
                (num : any) =>
                {
                    toBeSent = num;
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

/**
 * Queries the average area of each sticker
 */
app.get('/api/avgArea', (req, res) => {
    var queryString = "select ROUND(avg(width) * avg(height)::decimal, 2) from sticker"
    const query = client.query(queryString);

    query.then(
        (result : any) =>
        {
            let toBeSent : any = {'avgSize': 0};
            result.rows.forEach(
                (num : any) =>
                {
                    toBeSent.avgSize = num;
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
});

//---------------------------- Gallery Page ----------------------------
// filter urls based on those containing stickers with the given
// color, brand, gender.  'Any' for any of these parameters will match
// all values of that parameter return JSON in the form
// {laptop_picture_urls: urls} where urls is a possibly empty array of strings.
//----------------------------------------------------------------------
app.get('/api/getStickerUrls/:color/:laptopbrand/:gender', (req, res) => {
    //var queryString = "select person_id, laptop_picture_url from person where person_id in (select person_id from person_has_sticker) ";

    /** Generate this:
    select distinct person_id, laptop_picture_url from
        (select person_id, sticker_id from person_has_sticker
            join person p using (person_id)
            join sticker s using (sticker_id)
            join color c using (color_id)
            join laptop l using (laptop_id)
            where true
                and c.name = 'color'
                and l.brand = 'laptopbrand'
            order by rand()
        ) as t;
    */

    var queryString = "select distinct person_id, laptop_picture_url from (select * from person_has_sticker join person p using (person_id) join sticker s using (sticker_id) join color c using (color_id) join laptop l using (laptop_id) where true ";
    var endStr = " order by random() limit 10 ) as t";

    if(req.params['color'] != "Any"){
        queryString += " and c.name = '" + req.params['color'] + "' ";
        endStr = " order by random() ) as t";
    }
    if(req.params['laptopbrand'] != "Any"){
        queryString += " and l.brand = '" + req.params['laptopbrand'] + "' ";
        endStr = " order by random() ) as t";
    }
    if(req.params['gender'] != "Any"){
        if(req.params['gender'] == 'Other'){
            queryString += " and p.gender <> 'Male' and p.gender <> 'Female' ";
            endStr = " order by random() ) as t";
        }else{
            queryString += " and p.gender = '" + req.params['gender'] + "' ";
            endStr = " order by random() ) as t";
        }
    }

    console.log('gallery query: ' + queryString + endStr);
    const query = client.query(queryString + endStr);
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
            console.log(err);
        }
    );
});


//--------Sticker Analytics------------

/**
 * Queries the database to provide the data pairs to create different types of graphs 
 * @param xaxis stat to compare on the x-axis
 * @param yaxis stat to compare on the y-axis
 * @param whether data should be displayed in ascending or descending order 
 */
app.get('/api/:xaxis/:yaxis/:sort',
    (req, res) =>
    {
        var joins = "";
        var yAxis = "";
        var xAxis = "";
        var sort = "";
        var limit = " limit 12 "; //so that chart doesn't get too big
        var having = " having count(distinct person_id) > 1 "; // to remove outliers
        var scatterQuery = false;


        //setting what to join with based off of x-axis plus what to query
        if (req.params['xaxis'] == "major")
        {
            joins = " join major using (major_id) ";
            xAxis = " major.name ";
        }
        if (req.params['xaxis'] == "hometown_location")
        {
            joins = " join hometown_location on (person.hometown_location_id = hometown_location.location_id and hometown_location.state is not null) ";
            xAxis = " hometown_location.state ";
        }
        if (req.params['xaxis'] == "laptop")
        {
            joins = " join laptop using (laptop_id) ";
            xAxis = " laptop.brand ";
        }

        if (req.params['xaxis'] == "laptop_purchased_dt")
        {
            xAxis = " concat(to_char(person.laptop_purchased_dt, 'MON'), extract(year from person.laptop_purchased_dt)) ";
            scatterQuery = true;
            limit = "";
            having = "";
        }

        if (req.params['xaxis'] == "gender")
        {
            xAxis = " person.gender ";
        }

        //setting what to join with based off of y-axis plus what to query
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
            yAxis = " count(person_has_sticker.sticker_id)::decimal / count(distinct person_has_sticker.person_id) ";

            joins += " join person_has_sticker using (person_id) ";
            joins += " join sticker using (sticker_id) ";
        }

        sort = req.params['sort'];

        //creates query string
        const queryString = " select " + xAxis + " as xAxis , " + yAxis + " as yAxis " +
                            " from person " +
                            joins +
                            " group by " + xAxis +
                            having +
                            " order by yAxis " + sort +
                            limit + ";";

        console.log(queryString);

        const query = client.query(queryString);

        query.then(
            (result : any) =>
            {
                var toBeSent;
                //creates list of x, y pairs for scatter plot
                if(scatterQuery) {
                    toBeSent = [];
                        result.rows.forEach(
                        (pair : any) =>
                        {
                            toBeSent.push({'x': Date.parse(pair.xaxis), 'y': Number(pair.yaxis) });
                        }
                        );
                //provides values for bar-graph
                } else {
                toBeSent = {'xValues':[], 'yValues':[]};
                result.rows.forEach(
                    (pair : any) =>
                    {
                        toBeSent.xValues.push(pair.xaxis);
                        toBeSent.yValues.push(Number(pair.yaxis));
                    }
                    );
                }
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
