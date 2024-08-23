const { Browser } = require("puppeteer");
const puppeteer = require("puppeteer");
const scrapers = require('./scraper');
const fs = require('fs');
const scrapeController = async (BrowserInstance) => {
    // const url = 'https://phongtro123.com/';
    const url = 'https://www.instagram.com/tr.zanqi/';
    const indexs = [1, 2, 3, 4];
    try {
        let browser = await BrowserInstance;
        await scrapers.scaperins(browser, url);
        // gọi hàm cào ở file scarpe
        // const categories = await scrapers.scarpeCategory(browser, url);
        // console.log(categories);
        // const selectedCategories = categories.filter((category, index) => {
        //     return indexs.some(i => i === index);
        // });

        // const selectedCategoies = categories.filter((category, index) => indexs.some(i => i === index));
        // console.log(selectedCategoies[0].link);
        //   // Nếu có danh mục được chọn, tiến hành cào dữ liệu từ một trong chúng
        //   if (selectedCategoies.length > 0) {
        //     await scrapers.scraper(browser,  selectedCategoies[0].link);
        // } else {
        //     console.log("Không tìm thấy danh mục phù hợp.");
        // }

        // let result = await scrapers.scraper(browser, selectedCategoies[0].link);
        // // console.log(result);
        // fs.writeFileSync('chothuephongtro.json', JSON.stringify(result), (err) => {
        //     if (err)
        //         console.log('Data written to file', err);
        //     console.log("Data written to file successfully");

        // });
        await browser.close();

    } catch (e) {
        console.log("Could not create error> : ", e);
    }

}
module.exports = scrapeController;