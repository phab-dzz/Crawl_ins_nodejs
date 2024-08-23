const fs = require('fs');
const puppeteer = require('puppeteer');
const https = require('https');

(async () => {
    const url = 'https://static123.com/watch?v=6547921';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Tìm URL của video trong phần tử video hoặc trong mã nguồn trang
    const videoUrl = await page.evaluate(() => {
        const videoElement = document.querySelector('video');
        return videoElement ? videoElement.src : null;
    });

    if (!videoUrl) {
        console.error('Không tìm thấy URL video!');
        await browser.close();
        return;
    }

    console.log('URL video:', videoUrl);

    // Tải video về
    const file = fs.createWriteStream('video.mp4');
    https.get(videoUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                console.log('Tải video thành công!');
            });
        });
    }).on('error', (err) => {
        fs.unlink('video.mp4');
        console.error('Lỗi khi tải video:', err.message);
    });

    await browser.close();
})();
