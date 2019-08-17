const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

const getHTML = async () => {
    try{
        return await axios.get('https://www.melon.com/chart/');
    }catch(e){
        console.error(e);
    }
};

getHTML().then(html => {
    let array = [];
    const $ = cheerio.load(html.data);
    const $musicList = $("div.wrap_song_info");

    $musicList.each(function(i, el){
        array[i] = {
            title: $(this).find('div.rank01 a').text()
        };
    });
    log(array);
})