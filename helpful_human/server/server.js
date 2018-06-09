const express = require('express')
const app = express()
const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get("/scrape-colors",function colorScraper(req,res){
    res.status(200).json("Colors Scraped");
})

app.listen(8080)
console.log('server listening on port 8080')