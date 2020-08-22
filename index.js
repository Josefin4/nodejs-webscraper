
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

request('https://en.wikipedia.org/wiki/Big_cat', (error, response,
 html) => {
if( !error && response.statusCode == 200){
     const $ = cheerio.load(html);

 var title, content;
 var json = { title : "", content : ""};
    
  $('.firstHeading').filter(function(){
  const siteHeading = $('.firstHeading');
  title = siteHeading.find('h1').text();
  content = siteHeading.children('h1').next().text();
    
  json.title = title;
  json.content = content;
  })
    

$('#mw-content-text').each((i, el) => {
    const title = $(el).find('.mw-headline').text();
    const content = $(el).find('p').text();
    
    json.title = title;
    json.content = content;
          

})


}else{
    console.log('Something wrong');
 }
  fs.writeFile('wiki.json', JSON.stringify(json, null, 2), function(err){
            console.log('The data has been saved in a file! Look for the wiki.json file');
          })
 })

