const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express();
const DB = process.env.MONGODB_URI || "mongodb+srv://aashi:Aashi1902@cluster0.yeowrpd.mongodb.net/"

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log("not wrking");
    console.log(err.message);
})

// app.get('/',(req,res)=>{
//     res.json({message: "hey"})
// })
app.use(cors())
//routes
app.use(express.json())
app.use('/api/extract',require('./routes/extract'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})