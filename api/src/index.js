const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var helmet = require('helmet')
var cors = require('cors')
app.use(helmet())
app.use(cors({ origin: 'http://localhost:3000' }))

var databaseName = "mercedes-hackathon-db";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/" + databaseName;
var mongoDB = null;

MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    console.log("Database created!");
    mongoDB = database;
    //initDatabase();
});

function initDatabase() {
    mongoDB.db(databaseName).collection("Vehicle_Body").insertMany([
        // MongoDB adds the _id field with an ObjectId if _id is not present
        { id: "1", description: "City Car" },
        { id: "2", description: "Sedan" },
        { id: "3", description: "SUV" },
        { id: "4", description: "Family" },
        { id: "5", description: "Premium" },
        { id: "6", description: "Classic" },
        { id: "7", description: "Van" },
        { id: "8", description: "Truck" },
        { id: "9", description: "Bus" }
    ]);
    mongoDB.db(databaseName).collection("Vehicle_Extras").insertMany([
        // MongoDB adds the _id field with an ObjectId if _id is not present
        { id: "1", description: "Navigation System" },
        { id: "2", description: "Snow Chains" },
        { id: "3", description: "Toddler Safety Seat" },
        { id: "4", description: "Baby Safety Seat" },
        { id: "5", description: "Child Safety Seat" },
        { id: "6", description: "Cross Border Fee" },
        { id: "7", description: "GPS" },
        { id: "8", description: "Wifi Hotspot" }
    ]);
    mongoDB.db(databaseName).collection("Vehicles").insertMany([
        // MongoDB adds the _id field with an ObjectId if _id is not present
        //Demo: Gullwing, Focus for Family, autonomous electic, truck, bus

        //classic cars
        {
            id: "1",
            type: "6",
            picture: "https://rmsothebys-cache.azureedge.net/2/4/1/5/6/c/24156c38dc4e4072bc656f5217183a1c56b16014.jpg",
            make: "Mercedes",
            model: "Gullwing",
            date: "1955",
            doors: "2",
            fuel: "Petrol",
            driving: "Manual",
            price: "850",
            co2: "100",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "James Bond", serviceFee: "200", serviceDate: "0" },
                    { serviceType: "Pick Up", serviceProvider: "Reboques Premium", serviceFee: "48.89", serviceDate: "0" },
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Midas", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Repsol", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Mercedes Workshop", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "2",
            type: "6",
            picture: "https://rmsothebys-cache.azureedge.net/8/7/c/c/d/b/87ccdb0fc6d14a311ec23f035baf944387553d8a.jpg",
            make: "Porsche",
            model: "911 Carrera RS",
            date: "1973",
            doors: "2",
            fuel: "Petrol",
            driving: "Manual",
            price: "680",
            co2: "100",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "Carlos Gomes", serviceFee: "24.50", serviceDate: "0" },
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Norauto", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Galp", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Fidelidade", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Midas", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "3",
            type: "6",
            picture: "https://www.thenational.ae/image/policy:1.445395:1499627350/image/jpeg.jpg",
            make: "Ferrari",
            model: "Testarossa",
            date: "1984",
            doors: "2",
            fuel: "Petrol",
            driving: "Manual",
            price: "310.13",
            co2: "100",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "Manuel Joaquim", serviceFee: "24.50", serviceDate: "0" },
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Norauto", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Galp", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Fidelidade", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Midas", serviceFee: "152.21", serviceDate: "538" }
                ]
        },

        //family cars
        {
            id: "4",
            type: "4",
            picture: "https://images.caricos.com/f/ford/2015_ford_focus_wagon/images/1920x1080/2015_ford_focus_wagon_1_1920x1080.jpg",
            make: "Ford",
            model: "Focus",
            date: "2016",
            doors: "5",
            fuel: "Diesel",
            driving: "Manual",
            price: "316.52",
            co2: "100",
            shildSeat: "yes",
            services:
                [
                    { serviceType: "Pick Up", serviceProvider: "Garagem Joaquim Ribeiro", serviceFee: "48.89", serviceDate: "0" },
                    { serviceType: "Child Seat Install", serviceProvider: "Joaquim Ribeiro", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Repsol", serviceFee: "53.78", serviceDate: "12" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Midas", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Ford Workshop", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "5",
            type: "4",
            picture: "https://editorial.pxcrush.net/carsales/general/editorial/Renault-Megane-GT_cnr3.jpg?width=1024&height=682",
            make: "Renault",
            model: "Megane",
            date: "2017",
            doors: "5",
            fuel: "Diesel",
            driving: "Manual",
            price: "316.52",
            co2: "100",
            shildSeat: "yes",
            services:
                [
                    { serviceType: "Pick Up", serviceProvider: "Garagem Joaquim Ribeiro", serviceFee: "48.89", serviceDate: "0" },
                    { serviceType: "Child Seat Install", serviceProvider: "Joaquim Ribeiro", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Repsol", serviceFee: "53.78", serviceDate: "12" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Midas", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Ford Workshop", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "6",
            type: "4",
            picture: "https://t1-cms-2.images.toyota-europe.com/toyotaone/euen/toyota-auris-touring-sports-2018-exterior-tme-002-a-full_tcm-11-1196233.jpg",
            make: "Toyota",
            model: "Auris",
            date: "2018",
            doors: "5",
            fuel: "Petrol",
            driving: "Manual",
            price: "292.13",
            co2: "100",
            shildSeat: "yes",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "Manuel Joaquim", serviceFee: "24.50", serviceDate: "0" },
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Norauto", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Galp", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Fidelidade", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Midas", serviceFee: "152.21", serviceDate: "538" }
                ]
        },

        //autonomous cars
        {
            id: "7",
            type: "2",
            picture: "https://cdn.vox-cdn.com/uploads/chorus_image/image/50500495/2120x920_MS-RedSunset.0.png",
            make: "Tesla",
            model: "Model S",
            date: "2016",
            doors: "5",
            fuel: "Electric",
            driving: "Autonomous",
            price: "208.31",
            co2: "0",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Electric Recharging", serviceProvider: "Telsa Charging Station", serviceFee: "13.21", serviceDate: "4" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Tesla Lovers Garage", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Tesla Lovers Garage", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "90" },
                    { serviceType: "Repair", serviceProvider: "Tesla Lovers Garage", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "8",
            type: "2",
            picture: "https://www.telegraph.co.uk/cars/images/2017/02/20/2017_PRIUS_PHV_Aqua_Dynamic_04_trans_NvBQzQNjv4BquEFCvHreRVioWItRnm1hZbdxjchbeOcGRrsdcUP4AQs.jpg?imwidth=450",
            make: "Toyota",
            model: "Prius",
            date: "2017",
            doors: "5",
            fuel: "Electric",
            driving: "Autonomous",
            price: "248.88",
            co2: "0",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Electric Recharging", serviceProvider: "Repsol", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Midas", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Ford Workshop", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "10",
            type: "9",
            picture: "https://cdn1.autoexpress.co.uk/sites/autoexpressuk/files/2016/09/c-350-e-fd-23.jpg",
            make: "Mercedes",
            model: "C Class 350e",
            date: "2018",
            doors: "5",
            fuel: "Electric",
            driving: "Autonomous",
            price: "267.63",
            co2: "0",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Norauto", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Electric Recharging", serviceProvider: "Galp", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Fidelidade", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Midas", serviceFee: "152.21", serviceDate: "538" }
                ]
        },

        //trucks
        {
            id: "11",
            type: "9",
            picture: "https://www.coches.com/fotos_historicas/mercedes/Vito-Mixto-W639-2014/high_mercedes_vito-mixto-w639-2014_r6.jpg",
            make: "Mercedes",
            model: "Vito",
            date: "2014",
            doors: "5",
            fuel: "Diesel",
            driving: "Manual",
            price: "221.52",
            co2: "200",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "Serafim Ribeiro", serviceFee: "13.21", serviceDate: "4" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Telsa Charging Station", serviceFee: "13.21", serviceDate: "4" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Tesla Lovers Garage", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Tesla Lovers Garage", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "90" },
                    { serviceType: "Repair", serviceProvider: "Tesla Lovers Garage", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "12",
            type: "9",
            picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nissan_NV200_Vanette_Van_001.JPG/1200px-Nissan_NV200_Vanette_Van_001.JPG",
            make: "Nissan",
            model: "NV200",
            date: "2016",
            doors: "5",
            fuel: "Diesel",
            driving: "Manual",
            price: "297.77",
            co2: "180",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Pick Up", serviceProvider: "Garagem Joaquim Ribeiro", serviceFee: "48.89", serviceDate: "0" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Repsol", serviceFee: "53.78", serviceDate: "12" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Midas", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "25" },
                    { serviceType: "Insurance", serviceProvider: "Allianz", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Ford Workshop", serviceFee: "152.21", serviceDate: "538" }
                ]
        },
        {
            id: "9",
            type: "2",
            picture: "http://images.autojini.net/AJC/50424/vehicles/4609536_395844E9-E95A-0355-D03475840352D4C2_x.jpg",
            make: "Ford",
            model: "Transit",
            date: "2018",
            doors: "5",
            fuel: "Diesel",
            driving: "Manual",
            price: "292.13",
            co2: "170",
            shildSeat: "no",
            services:
                [
                    { serviceType: "Delivery", serviceProvider: "Manuel Joaquim", serviceFee: "24.50", serviceDate: "0" },
                    { serviceType: "Parking", serviceProvider: "Martim Moniz Park", serviceFee: "18.75", serviceDate: "1" },
                    { serviceType: "Interior Cleaning", serviceProvider: "Norauto", serviceFee: "18", serviceDate: "15" },
                    { serviceType: "Washing / Polishing", serviceProvider: "Classic Care", serviceFee: "18", serviceDate: "18" },
                    { serviceType: "Petrol Refuel", serviceProvider: "Galp", serviceFee: "53.78", serviceDate: "36" },
                    { serviceType: "Insurance", serviceProvider: "Fidelidade", serviceFee: "6.89", serviceDate: "134" },
                    { serviceType: "Repair", serviceProvider: "Midas", serviceFee: "152.21", serviceDate: "538" }
                ]
        }
    ]);
    console.log("Database populated with baseline data!");
    //mongoDB.close();
}

app.post('/', (request, response) => {
    initDatabase();
    response.send('done');
})

app.get('/', (request, response) => {
    response.send('hi');
})

/* /vehicle-body-options
 * List of options to feed the vehicle body dropdown
 * returns an array of {int, string} representing {id, description}
 */
app.get('/vehicle-body-options', (request, response) => {
    mongoDB.db(databaseName).collection("Vehicle_Body").find().toArray(function (err, docs) {
        var data = docs;
        response.send(data);
    });
})

/* /vehicle-extras-options
 * List of options to feed the vehicle extras dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/vehicle-extras-options', (request, response) => {
    mongoDB.db(databaseName).collection("Vehicle_Extras").find().toArray(function (err, docs) {
        var data = docs;
        console.log(data);
        response.send(data);
    });
})

/* /services-options
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/services-options', (request, response) => {
    mongoDB.db(databaseName).collection("Services").find().toArray(function (err, docs) {
        var data = docs;
        response.send(data);
    });
})

/* /service-selected
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.get('/service-selected', (request, response) => {
    //rental / chauffeur / Repair /
    mongoDB.db(databaseName).collection("Services").find().toArray(function (err, docs) {
        var data = docs;
        response.send(data);
    });
})

/* /search-vehicles
 * List of options to feed the services dropdown
 * return an array of {int, string} representing {id, description}
 */
app.post('/search-vehicles', (request, response) => {
    const { type, make, model } = request.body;
    let requestData = {};
    requestData.type = type;
    if (make !== undefined && make !== "" && make !== "0") {
        requestData.make = make;
    }
    if (model !== undefined && model !== "" && model !== "0") {
        requestData.model = model;
    }
    console.log("requestData type = " + requestData.type + " | make = " + requestData.make + " | model = " + requestData.model);
    mongoDB.db(databaseName).collection("Vehicles").find(requestData).toArray(function (err, docs) {
        var data = docs;
        response.send(data);
    });
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
