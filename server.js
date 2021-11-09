const express = require('express');
const bodyParser = require('body-parser');
const routeUsers = require('./app/routes/user.routes');
const routeNotes = require('./app/routes/note.routes');
const dbConnect = require('./config/note.dbConnect');
const logger = require('./config/winston_logger');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const cors = require('cors');
const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/notes', routeNotes);
app.use('/users', routeUsers);

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to FundooNotes application. Take notes quickly. Organize and keep track of all your notes."});
    logger.info("Welcome to FundooNotes application. Take notes quickly. Organize and keep track of all your notes.");
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000.");
    logger.info("Server is listening on port 4000.");
    dbConnect;
});

