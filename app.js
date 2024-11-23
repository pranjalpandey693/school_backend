const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const schoolRoute = require('./route/schoolRoutes')
const app = express();
const cors = require("cors")

app.use(cors({
    origin: '*',
}))

app.use(express.json());

app.use('/api',schoolRoute)

const PORT = process.env.PORT || 5012;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
