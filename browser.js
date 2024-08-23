const puppeteer = require('puppeteer');
const fs = require('fs');
const startBrowser = async () => {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });

    } catch (e) {
        console.log("Could not create error> : ", e);
    }
    return browser;
}
module.exports = startBrowser;