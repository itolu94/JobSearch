const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const madison = require('madison');


exports.getDice = (req, cb) =>{
	let {title, page, state, city} = req || '';
    let url =`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${title}&pgcnt=7&page=${page}&state=${state}&&city=${city}sort=4`
    axios.get(url).then((response) => {
		// console.log(response.data.resultItemList);		
		return cb(response.data.resultItemList);
	})
}

exports.getCyberCoders = (req,cb) =>{
	let {title, page, state ,city} = req || '';
	madison.getStateAbbrev(state, (abbrev)=> {
		state = abbrev;
		let url = `https://www.cybercoders.com/search/?page=${page}&?searchterms=${title}&searchlocation=${city}%2C+${state}&newsearch=true&originalsearch=true&sorttype=1`
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
					company: 'N/A',
					date: moment().format(' MMM do, YYYY')
				}
				results.push(data);
			});
			// console.log(results);
		return(cb(results));   
		});
});

}


exports.getZipRecruiter = (req, cb) => {
  	let {title, page, state, city} = req || '';
	madison.getStateAbbrev(state, (abbrev)=> {
		let url = `https://www.ziprecruiter.com/candidate/search?search=${title}&location=${city}%2C+${state}&page=${page}`  
		// console.log(url);
		let results = [];
		request(url, (err, resp, html) => {
				let $ = cheerio.load(html);
				$('.job_content').each((i, listing) => {
					// console.log('title: ' + $(listing).children('.t_job_link').children('.job_title').text().trim());
					// console.log('location: ' + $(listing).children('.job_org').children().last().text().trim());
					// console.log('link: ' + $(listing).children('.t_job_link').attr('href'));
					// let parent = $(listing).children('.job-details-container');
					let jobTitle = $(listing).children('.t_job_link').children('.job_title').text().trim();
					let detailUrl = $(listing).children('.t_job_link').attr('href')
					let location = $(listing).children('.job_org').children().last().text().trim()
					let company = $(listing).children('.job_org').children().first().text().trim()
					let data = {
						jobTitle,
						detailUrl,
						location,
						company,
						website: 'Zip Recruiter',
						date: moment().format(' MMM do, YYYY')
					}
					results.push(data);
				});
				// console.log(results.length);
				return cb(results);
			});
	});
}