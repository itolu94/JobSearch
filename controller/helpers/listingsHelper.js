const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const madison = require('madison');



//TODO refactor to make cleaner and simplier
exports.getDice = (req, cb) => {
    let {title, page, state, city} = req || '';

    let url;
    madison.getStateAbbrev(state, (abbrev) => {
        if(page <= 1){
            url = `https://www.dice.com/jobs/q-${title}-limit-7-l-${city}%2C_${abbrev}-radius-30-startPage-1-limit-7-jobs?`
        } else {
            url = `https://www.dice.com/jobs/q-${title}-limit-7-l-${city}%2C_${abbrev}-radius-30-startPage-${page}-limit-7-jobs`
        }
        console.log(url);
        request(url, (err, resp, html) => {
            let $ = cheerio.load(html),
                result = [];
            // find div where job postings are available;
            $('#serp').each(function (i, article) {
                var position = 0,
                    counter = 0,
                    temp = {};

                //loop through each job posting
                $(article).children('.serp-result-content').each(function (i, content) {

                    temp = {};
                    temp.website = "Dice";
                    // each postings has two divs that are looped over
                    $(this).children('ul.list-inline').each(function (i, jobss) {

                        if (position === 0) {
                            $(jobss).children().children().each(function (j, jobsLink) {

                                if (j == 0) {
                                    var htmlArray = [];
                                    htmlArray.push($(jobsLink).html());
                                    temp.detailUrl = `https://www.dice.com${$(jobsLink).find("a").attr('href')}`;
                                    temp.date = moment().format(' MMM do, YYYY');
                                    counter++
                                }
                            })
                            // console.log($(jobss).find("a").attr());
                            temp.jobTitle = $(jobss).children().children().text().trim();
                            position++;
                        } else {
                            // console.log($(jobss).find($('.hidden-md')).find("span").html());
                            temp.company =  $(jobss).find($('.hidden-md')).find("span").html();
                            temp.location = $(jobss).find($('span.jobLoc')).html().trim();
                            result.push(temp);
                            position = 0
                        }
                    });
                });
            });
            // console.log(result);
            return cb(result);
        })

    });
}

exports.getCyberCoders = (req, cb) => {
    let {title, page, state, city} = req || '';
    madison.getStateAbbrev(state, (abbrev) => {
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
            return (cb(results));
        });
    });

}


exports.getZipRecruiter = (req, cb) => {
    let {title, page, state, city} = req || '';
    madison.getStateAbbrev(state, (abbrev) => {
        let url = `https://www.ziprecruiter.com/candidate/search?search=${title}&location=${city}%2C+${state}&page=${page}`
        // console.log(url);
        let results = [];
        request(url, (err, resp, html) => {
            let $ = cheerio.load(html);
            $('.job_content').each((i, listing) => {
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