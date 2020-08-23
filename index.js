
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

request('https://en.wikipedia.org/wiki/Big_cat', (error, response,
  html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    const body = $('.mw-parser-output').children();

    const data = [];

    body.each((i, el) => {
      const siteHeading = $('.firstHeading').text();
      const title = $(el).filter('h2');
      const content = $(title).nextUntil('h2', 'p').text();

      data[i] = {
        heading: siteHeading,
        title: title.text().trim(),
        content: content
      }

      // console.log(data);

    })
    const jsonFile = JSON.stringify(data);

    fs.writeFile('wiki.json', jsonFile, function (err) {
      console.log('The data has been saved in a file! Look for the wiki.json file');
    })
  } else {
    console.log('Something is wrong !');
  }

})

