import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const databaseName = 'mercedes-hackathon-db';
const url = 'mongodb://localhost:27017/';
let mongoDB = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));


MongoClient.connect(url, (err, database) => {
    if (err) throw err;
    mongoDB = database;
});

/**
 * /vehicle-body-options
 * List of options to feed the vehicle body dropdown
 * returns an array of {int, string} representing {id, description}
 */
app.get('/vehicle-body-options', async (request, response) => {
    try {
        const docs = await mongoDB.db(databaseName).collection('Vehicle_Body').find().toArray();
        response.send(docs);
    } catch (error) {
        response.send({ success: false });
    }
});

/* /vehicle-extras-options
 * List of options to feed the vehicle extras dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/vehicle-extras-options', async (request, response) => {
    try {
        const docs = await mongoDB.db(databaseName).collection('Vehicle_Extras').find().toArray();
        response.send(docs);
    } catch (error) {
        response.send({ success: false });
    }
});

/* /services-options
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/services-options', async (request, response) => {
    try {
        const docs = await mongoDB.db(databaseName).collection('Services').find().toArray();
        response.send(docs);
    } catch (error) {
        response.send({ success: false });
    }
});

/* /service-selected
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/service-selected', async (request, response) => {
    // rental / chauffeur / Repair /
    try {
        const docs = await mongoDB.db(databaseName).collection('Services').find().toArray();
        response.send(docs);
    } catch (error) {
        response.send({ success: false });
    }
});

/* /search-vehicles
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.post('/search-vehicles', async (request, response) => {
    const { type, make, model } = request.body;
    const requestData = {};
    requestData.type = type;
    if (make !== undefined) {
        requestData.make = make;
    }
    if (model !== undefined) {
        requestData.model = model;
    }
    try {
        const docs = await mongoDB.db(databaseName).collection('Vehicles').find(requestData).toArray();
        response.send(docs);
    } catch (error) {
        response.send({ success: false });
    }
});

app.listen(3001, () => console.log('Example app listening on port 3001!'));
