const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');


exports.getDice = (req, cb) =>{
    let {title, page} = req.params;
	let state = req.params.state || '';
    let url =`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${title}&pgcnt=7&page=${page}&state=${state}&sort=4`
    axios.get(url).then((response) => {
		console.log(response.data.resultItemList);		
		return cb(response.data.resultItemList);
	})
}

exports.getCyberCoders = (req,cb) =>{
  	let {title, page} = req.params;
	let state = req.params.state || '';
	let url = `https://www.cybercoders.com/search/?page=${page}?searchterms=${title}&searchlocation=${state}&newsearch=true&originalsearch=true&sorttype=1`
	let results = [];
    request(url, (err, resp, html) => {
		let $ = cheerio.load(html);
		$('.job-listing-item').each((i, listing) => {
			let parent = $(listing).children('.job-details-container');
			let title = parent.children('.job-title').text().trim();
			let link = `https://www.cybercoders.com/${parent.children('.job-title').children('a').attr('href')}`
			let location = parent.children('.details').children('.location').text().trim();
			let data = {
				jobTitle: title,
				detailUrl: link,
				location: location,
				website: 'CyberCoders',
				date: moment().format(' MMM do, YYYY')
			}
			results.push(data);
        });
     return(cb(results));   
    });
}