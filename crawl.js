const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const log = console.log;

const getMelon = async () => {
    try {
        return await axios.get('https://www.melon.com/chart/');
    } catch (e) {
        console.error(e);
    }
};

getMelon().then(html => {
    let array = [];
    const $ = cheerio.load(html.data);
    const $musicList = $("div.wrap_song_info");

    $musicList.each(function (i, el) {
        array[i] = {
            title: $(this).find('div.rank01 a').text(),
            artist: $(this).find('div.rank02 a').text()
        };
    });

    const chart = array.filter(function (v) {
        return v.title !== '';
    })
    return chart;
})
.then(res => fs.writeFileSync('melon.json', JSON.stringify(res)));

const getGenie = async () => {
    try{
        return await axios.get('https://www.genie.co.kr/chart/top200');
    }catch(e){
        console.error(e);
    }
};

getGenie().then(html => {
    let array = [];
    const $ = cheerio.load(html.data);
    const $musicList = $("td.info");

    $musicList.each(function(i, el){
        array[i] = {
            title:  $(this).find('a.title').text().trim(),
            artist: $(this).find('a.artist').text().trim()
        };
    });
    
    const chart = array.filter(function(v){
        return v.title !== '';
    })
    return chart;
})
.then(res => fs.writeFileSync('genie.json', JSON.stringify(res)));

const getBugs = async () => {
    try{
        return await axios.get('https://music.bugs.co.kr/chart');
    }catch(e){
        console.error(e);
    }
};

getBugs().then(html => {
    let array = [];
    const $ = cheerio.load(html.data);
    const $musicList = $('tbody').children('tr');

    $musicList.each(function(i, el){
        array[i] = {
            title:  $(this).find('p.title a').text(),
            artist: $(this).find('p.artist a').text()
        };
    });
    
    const chart = array.filter(function(v){
        return v.title !== '';
    })
    return chart;
    
})
.then(res => fs.writeFileSync('bugs.json', JSON.stringify(res)));