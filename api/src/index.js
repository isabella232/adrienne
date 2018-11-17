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


app.get('/', (request, response) => {
    response.send('hi');
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
