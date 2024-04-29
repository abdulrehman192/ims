// imports
//need to install express package
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');


// initiate express 
const app = express();
app.use(cors());
// const allowedOrigins = [process.env.BASE_URL, 'http://localhost:61703/'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: 'GET,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }))
app.use(multer().any());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


//this is a comment

//end points

app.get("/api", (request, response)=> {

    response.json(
        {
            success : true,
            message : "Api Server Running..."
        }
    );
});

//users end points
const companiesRouter = require("./api/companies/companies.router");
const officesRouter = require("./api/offices/offices.router");
const departmentsRouter = require("./api/departments/departments.router");
const usersRouter = require("./api/users/users.router");
const countriesRouter = require("./api/countries/countries.router");
const employeesRouter = require("./api/employees/employees.router");
const announcementRouter = require("./api/announcements/announcements.router");
const filesRouter = require("./api/common-files/common-files.router");
const digitalAssetsRouter = require("./api/digital-assets/digital-assets.router");
const physicalAssetsRouter = require("./api/physical-assets/physical-assets.router");

app.use("/api/companies", companiesRouter);
app.use("/api/offices", officesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/files", filesRouter);
app.use("/api/assets", digitalAssetsRouter);
app.use("/api/assets", physicalAssetsRouter);

app.listen(process.env.APP_PORT || 4000, ()=> {
    console.log("Server is running on port : ", process.env.APP_PORT);
});
