const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require("./routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(routes)


app.listen(8080)
console.log('server listening on port 8080')