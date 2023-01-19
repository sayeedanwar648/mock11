const express = require('express');
const cors = require('cors');
const {connection} = require('./config/db');
const {UserRouter} = require('./routes/user.route');
const { BugRouter } = require('./routes/bug.route');

const app = express();
app.use(express.json());

app.use(cors({
    origin:'*'
}));


app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.use('/users',UserRouter);

app.use("/bug",BugRouter);
app.listen(9090,async()=>{
    try {
        await connection;
        console.log("Started Surver on PORT 9090");
    } catch (error) {
        console.log("Not Connected Successfully with DB",error);
    }
})