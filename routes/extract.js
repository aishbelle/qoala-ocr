const vision = require('@google-cloud/vision');
const express = require('express');
const router = express.Router();
const IDCard = require('../models/idcard')
const multer = require('multer')
var upload = multer({ storage:multer.memoryStorage()})



const CREDENTIALS = JSON.parse(JSON.stringify(
    {
        "type": "service_account",
        "project_id": "tonal-land-409116",
        "private_key_id": "6ea2d133e472d60d0f0d4c0169bcb8512a3df56d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCh5UDwWM2jKBgE\nXNVLy7GC3m+gjqYGZaFjdG4zZXnXzRKpwzB0HHbwPHdo8aMpws6ExsUfbewlptBV\nqK5MkRM/7YHoeaytLXiqiQR66jl42cO29OIoaj/pWpUEFZCHWJMl1VoHhlLp+qH5\ng51lfq53Wmj86zYeAdPzp7tjEJa1oikfjtu+FfFJzCMW0YhiUuA3I94kunjn2teB\n9pjlNvMRIPvyjf9fmV1Jfht7ebe1V77f+r5ySe+KrB/sV+AUiDodq+nHTXBRfikB\nVOLr9KhJvPAgqF7lrjrLIezYQa0x5XCe4w2PN2GDJAq+jLH2oEPDYOBaS/9FsXul\n2lBEiTANAgMBAAECggEAAdkDgXj0NlCTorTjh8HJv6ns2oBI84YEXH6jmslJLMtR\nTC8Y+YANjjwxGbI3M167VmPFXqz8vfOZvrcyb56ps1SNv/rLTXnndrzM35hdz0aX\n3sRhcoLNezWvbBftd/2JRtb1RiuLbotBfw1GlEths0/3USxRufAAysxchoArN7mC\nmsvUJP4p/xzPo6pQavEDUvxA/jRdnG8JnkSBkHYwdReT35dya15+yV7FG5FQky1M\njfvS/50LVVzPlMoBaaIcx3HQPnJOKsV07lE2ah8RPLoY0vxq9UG1zM5l8sVX/ST6\n+MPWqCrmx/RZ+rbpxGy6kV6Qh557M7Z3sR36WRuSEQKBgQDbyXBzFrf+9KAZO+aw\nrEi2FzN8PMUl9dpeDFBeqxBWq3eGYpIlWQU0kMKDCOwB12sxampHJw1csR4nzG24\naZEx0De2oAFjC7kSeN4NZmdbhUhG9UKUrztIZ/CaXcj1xN2xGIxR7AOPJKCYyywH\nJJIjSiLTipjWAX44T3AYWmlckQKBgQC8kfhmfXye1NzB50Etb3top3Jc0w/1rpLU\nTQVFcnhcxhdCkKTsd05e3RGkolz8Hkr0quTA2AOO5fDJg8boyY9eGEvL2sHCbLxI\nHUTjuahUZWIwm+iNR0kksaKZRw+yYbLgMWtERc/3YeZyc3UJs2B4nBHFhUiIZTya\nbEVXqvLJvQKBgBA8/8vg/9Mca7+xh0fCUtTxPeKN8trtIScVrdJwvRJKNNh+6+FK\nhHHvyA86V4WDTu4luJhtMDWK+HlkRy76zblqctNRWwjgUtokh/Nhf31piX+Em1i0\n4aJl24bsKu7NjruI3sUmtNSclijzydr1Pr7QuWX7tXMKRTMP225RL7uhAoGAYjMe\nCbmVuV0erXfRkGi6+rAgtUhQyl+kJR0K/rRzC9U47bhHusEStgIoGvVWuRDJdgq8\n39ReXf9O2pJedoHowFakuj9soeRgVKmxY2oex/yYGrpGa7RQ2eQLygigmwOX1HrH\n4qD8gVahXL7Vlzyro4ObGaKkOCuIWN7DabkjgH0CgYEAqSeruB4JbBbAEOvkkgoS\nWNICKLy50XBNw4s3nGC363egPFay+NC3VQYX1cT6HeUQ/J5tk2+tSNT5ehjQtsWf\nPnOc2wKvn9/77SEmfwydg/dO7ZN69uLcnsVkcj80k9y89HUxFHZjKN8FLO5w7UwC\nWZ6SAqs2mG6zl5yFntNT1hE=\n-----END PRIVATE KEY-----\n",
        "client_email": "qoala-ocr@tonal-land-409116.iam.gserviceaccount.com",
        "client_id": "115852285240104778303",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/qoala-ocr%40tonal-land-409116.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      
))
const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);





router.get('/getIds',async (req,res)=>{
    try {
     const idCard = await IDCard.find({})
     res.json(idCard)
    } catch (error) {
     console.log(error.message)
     res.status(500).json("Internal server Error")
    }
 })

 function searchAfter(stringResult, searchString) {
    let ans = "";
    let it = stringResult.lastIndexOf(searchString);
    if(it==-1)return "NA";
    it += searchString.length + 1;
    while (stringResult[it] != '\n') {
        ans += stringResult[it];
        it++;
    }
    return ans;
}
function searchBefore(stringResult, searchString) {
    let ans = "";
    let it = stringResult.lastIndexOf(searchString);
    if(it==-1)return "NA";
    it -= 2;
    while (stringResult[it] != '\n') {
        ans += stringResult[it];
        it--;
    }
    let reversed = ans.split('').reverse().join('');
    return reversed;
}
 
router.post(
    '/add',upload.single('image'),async (req, res) => {
        console.log("object")
        console.log(req.file)
        let file_path = req.file.path
        try {
            let [result] = await client.textDetection(file_path);
            console.log(result);
            let stringResult = result.fullTextAnnotation.text;
            const identificationNumber = searchAfter(stringResult, "Thai National ID Card")
            const name = searchAfter(stringResult, "Name");
            const lastName = searchAfter(stringResult, "Last name");
            const birthDate = searchAfter(stringResult, "Date of Birth");
            const issueDate = searchBefore(stringResult, "Date of Issue")
            const expiryDate = searchBefore(stringResult, "Date of Expiry")
            try {
                const idCard = new IDCard({ identification_number: identificationNumber, name: name, last_name: lastName, date_of_birth: birthDate, date_of_issue: issueDate, date_of_expiry: expiryDate })
                await idCard.save();
                // res.redirect("http://localhost:3000/")
                res.json(idCard)
                console.log(idCard);
            } catch (error) {
                console.log(error.message)
                res.status(500).json("Internal server Error")
            }
        } catch (error) {
            console.log("errorroror",error.message)
            res.status(500).json("Internal server Error")
        }
    }
)

router.put("/update/:id",async (req,res)=>{
    const {identification_number,name,last_name,date_of_birth,date_of_issue,date_of_expiry} = req.body;
    const newId = {}
    newId.identification_number=identification_number;
    newId.name=name;
    newId.last_name=last_name;
    newId.date_of_birth=date_of_birth;
    newId.date_of_issue=date_of_issue;
    newId.date_of_expiry=date_of_expiry
    
    try {
    const idCard = await IDCard.findById(req.params.id)
    if(!idCard){return res.status(401).res("Not Found")}
    const updatedId = await IDCard.findByIdAndUpdate(req.params.id,{$set : newId},{new:true})
    res.json(updatedId)
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server Error")
    }

})


router.delete("/delete/:id",async (req,res)=>{
    try {
    const  idCard= await IDCard.findById(req.params.id)
    if(!idCard){return res.status(401).res("Not Found")}
    const updatedId = await IDCard.findByIdAndDelete(req.params.id)
    res.send("Success")
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal server Error")
    }
})



module.exports = router;