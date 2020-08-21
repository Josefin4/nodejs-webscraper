const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const {PORT = 3000} = process.env;

//

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}....` ));
