const express = require('express');
const app = express();
const {PORT = 3000} = process.env;

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const writeStream = fs.createWriteStream('package.json');
writeStream.write('Title, content \n');

request('https://en.wikipedia.org/wiki/Big_cat', (error, response,
 html) => {
if( !error && response.statusCode == 200){
     const $ = cheerio.load(html);

 const siteHeading = $('.firstHeading');
 //console.log(siteHeading.text());
//  const output = siteHeading.find('h1').text();
//  const output = siteHeading.children('h1').text();
//  const output = siteHeading.children('h1').next().text();

$('#mw-content-text').each((i, el) => {
    const title = $(el).find('.mw-headline').text();
    const content = $(el).find('p').text();
    
    writeStream.write(`${title}, ${content} \n`);
    console.log('done');

})


}else{
    console.log('Something wrong');
 }
 });

//
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}....` ));
