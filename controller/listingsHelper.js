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
  let {title, page, state, city} = req.params || '';
//   let url = `https://www.monster.com/jobs/search/?q=${title}&where=${city}__2C-${state}&intcid=skr_navigation_nhpso_searchMain&sort=dt.rv.di&page=${page}`
  let url = `https://www.monster.com/jobs/search/?q=Javascript&where=Cary__2C-NC&intcid=skr_navigation_nhpso_searchMain&sort=dt.rv.di&page=1`
  
  let results = [];
  request(url, (err, resp, html) => {
		let $ = cheerio.load(html);
		$('#resultsWrapper').each((i, listing) => {
			console.log(i);
			// let parent = $(listing).children('.job-details-container');
			// let title = parent.children('.job-title').text().trim();
			// let link = `https://www.cybercoders.com/${parent.children('.job-title').children('a').attr('href')}`
			// let location = parent.children('.details').children('.location').text().trim();
			// let data = {
			// 	jobTitle: title,
			// 	detailUrl: link,
			// 	location: location,
			// 	website: 'CyberCoders',
			// 	company: 'N/A',
			// 	date: moment().format(' MMM do, YYYY')
			// }
			results.push(i);
		});
		// console.log(results);
		return cb(results);
    });
	
}