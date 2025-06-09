const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./routes/UserRouter');
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

// app.get(
//     '/',
//     (req, res)=>{
//         res.send("get api called")
//     }
// )

app.use('/user', UserRouter)

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName: "foodyWebsite",
    }
).then(
    ()=>{
        console.log("our db connected successfully");
        app.listen(PORT, ()=>{console.log("Our server started on port "+PORT);
        })
    }
).catch(
    (err)=>{
        console.log("error to connect with db", err.message);
        
    }
)