const express = require("express");

const app = express();

app.get('/',async(req,res)=>{

    res.status(200).send('Hello!');
})




const port = 3000;

app.listen(port,()=>{

    console.log(`Sunucu ${port} portunda başlatıldı.`);

})