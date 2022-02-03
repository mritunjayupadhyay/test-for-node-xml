const express = require( 'express' )
const app     = express();
const axios = require('axios');
var xmlparser = require('express-xml-bodyparser');
const port    = process.env.PORT || 3000;
app.use(xmlparser({
    normalizeTags: false
}));
app.get( '/' ,(req, res) => {
    res.type( 'text/plain' )
    res.send( 'Server Expresso ☕' )
});
app.get('/get-xml-res', async (req, res) => {
    const url = "https://api.jagota.com/JagotaReport/JagotaReports.asmx/PriceListV2?inGroupArray=SF&inLocation=BANGKOK&inUserName=T2104&inOrderTaking=N&inCoverPage=N&inProductClass=HUMANFOOD";
    const result = await axios.get(url, {headers: {"X-Requested-With": "XMLHttpRequest"}});
    let stringifiedXml = '<set id="1" state="0" name="wd"/>';
    res.type('application/xml');    
    res.send(result.data);
})
app.listen( port ,
() => console.log(`Expresso ☕ is on Port ${ port } Ctrl + C to Stop `) )