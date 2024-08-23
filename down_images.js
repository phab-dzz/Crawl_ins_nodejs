const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Tạo thư mục 'images' nếu chưa tồn tại
const imagesDir = path.resolve(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}
// const url = 'https://scontent.cdninstagram.com/v/t39.30808-6/449836726_17964519224772811_1622917574465797610_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=ywHpYoaL5QsQ7kNvgFQdNY8&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzQwNjg5OTgxMDA0NjIzNzMzNA%3D%3D.2-ccb7-5&oh=00_AYAg9HL_gXVaTPPdi0aj3MwN2iut43y5fIfZhQ_3QW7UXA&oe=66908880&_nc_sid=10d13b'
// const filePath = path.resolve(image, 'image1.jpg');
// Hàm để tải và lưu ảnh
const downloadImage = async (url, filePath) => {
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};
module.exports = downloadImage;
// Ví dụ URL của các ảnh
// const imageUrls = [
//     'https://example.com/image1.jpg',
//     'https://example.com/image2.jpg',
//     'https://example.com/image3.jpg'
// ];

// Tải và lưu từng ảnh
// (async () => {
//     for (const [index, url] of imageUrls.entries()) {
//         const filePath = path.resolve(imagesDir, `image${index + 1}.jpg`);
//         try {
//             await downloadImage(url, filePath);
//             console.log(`Image ${index + 1} downloaded successfully!`);
//         } catch (error) {
//             console.error(`Error downloading image ${index + 1}:`, error);
//         }
//     }
// })();
