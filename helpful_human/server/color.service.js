module.exports = {
  colorScraper: colorScraper
};

function colorScraper() {
    return new Promise(((resolve, reject)=>{
        return resolve("scraper connected")
    }))
}
