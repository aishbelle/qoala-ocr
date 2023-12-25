const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path=require('path')

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

const __dirnameT = path.resolve(path.dirname("")); 
app.use(express.static(path.join(__dirnameT, "/client/build")));
app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirnameT,'/client/build','index.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})