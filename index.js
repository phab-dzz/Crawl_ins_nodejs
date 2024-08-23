// const startbrowser = require('./browser');
// const scrapeController = require('./scrapeController');
// let browserInstance = startbrowser();
// scrapeController(browserInstance);
const path = require('path');
const fs = require('fs');
const downloadImage = require('./down_images');
// const url = 'https://scontent.cdninstagram.com/v/t39.30808-6/449836726_17964519224772811_1622917574465797610_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=ywHpYoaL5QsQ7kNvgFQdNY8&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwNjg5OTgxMDA0NjIzNzMzNA%3D%3D.2-ccb7-5&oh=00_AYAg9HL_gXVaTPPdi0aj3MwN2iut43y5fIfZhQ_3QW7UXA&oe=66908880&_nc_sid=10d13b'
function generateRandomString(prefix) {
    const randomNumber = Math.floor(Math.random() * 10000); // Tạo số ngẫu nhiên từ 0 đến 9999
    return `${prefix}${randomNumber}`;
}

const randomImageString = generateRandomString('image');

const imagesDir = path.resolve(__dirname, randomImageString);
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

const puppeteer = require('puppeteer');
const { url } = require('inspector');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/p/C9FJ3HBpOqw/?img_index=6') // Thay bằng URL thực tế
    console.log('Page is opened');
    // Đợi phần tử xuất hiện
    await page.waitForSelector('._aagu');
    console.log('Page is loaded');
    // const imageSrc = await page.evaluate(() => {
    //     // Tìm phần tử div với lớp _aagv và ảnh bên trong nó
    //     const imageElement = document.querySelector('div._aagv img');
    //     if (imageElement) {

    //         return imageElement.src;
    //     }


    //     return null;
    // });
    await page.waitForSelector('div._aagv img');
    let i = 0;
    const imageSrcs = await page.evaluate(() => {
        // Tìm tất cả các ảnh bên trong div với lớp _aagv
        const imageElements = document.querySelectorAll('div._aagv img');
        // Lấy src của tất cả các ảnh


        return Array.from(imageElements).slice(0, 10).map(img => img.src);


    });
    // const filePath = path.resolve(imagesDir, 'image1.jpg');
    for (let i = 0; i < imageSrcs.length; i++) {
        await downloadImage(imageSrcs[i], path.resolve(imagesDir, `image${i + 1}.jpg`));
    }
    // owdnloadImage(url, filePath);

    // console.log('Image src:', imageSrcs);

    await browser.close();
    // console.log('Browser is closed '+url);   
})();

