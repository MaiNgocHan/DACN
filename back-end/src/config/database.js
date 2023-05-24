require('dotenv').config();
const mongoose = require('mongoose');

var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];


const connection = async () => {
    try {
        const options = {
            dbName: process.env.DB_NAME
        }
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.esjmwr3.mongodb.net/test`,options);

            const state = Number(mongoose.connection.readyState);
            console.log(dbState.find(f => f.value == state).label, "to db"); // connected to db
    } catch (error) {
        console.log(">>> Connection Error");
    }
}
module.exports = connection;