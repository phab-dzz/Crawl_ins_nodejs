
const scarpeCategory = async (browser,url) => new Promise(async (resolve, reject) =>{

    try{
        let page = await browser.newPage();
        console.log("Opening page");

        await page.goto(url);
        console.log("Page opened"+url);
        await page.waitForSelector('#webpage');
        console.log("Page loaded");
   // cào dữ liệu
        const dataCategory = await page.$$eval('#navbar-menu >ul>li',els=>{
            dataCategory = els.map(el=>{
                return{
                    category:el.querySelector('a').innerText,
                    link:el.querySelector('a').href

                }
            })
    return dataCategory;
   })
//    console.log(dataCategory);
   await page.close();
   resolve(dataCategory)
    }catch(error){
        console.log("Error in opening page category: "+error);
        reject(error);
    }
  
});
//cào ins
const scaperins = async (browser,url) => new Promise(async (resolve, reject) =>{
    try{
        let page = await browser.newPage();
        console.log("Opening page");

        await page.goto(url);
        console.log("Page opened"+url);
        // await page.waitForSelector('body._ar45');
        console.log("Page loaded");
        const imagess = await pageDetail.$eval('div._aagv',(els)=>{
                
                imagess = els.map(el=>{
                    return el.querySelector('img').src;
                })
                return imagess;
              })
            // const media = els.map(el => {
            //     const img = el.querySelector('img');
            //     const iframe = el.querySelector('iframe');
            
            //     if (img) {
            //       return { type: 'image', src: img.src };
            //     } else if (iframe) {
            //       return { type: 'video', src: iframe.src };
            //     }
            //     return null;
            //   }).filter(item => item !== null);  // Loại bỏ các phần tử không chứa img hoặc iframe
            
            //   return media;
            // });
            console.log(imagess);
   await page.close();
   resolve()
    }catch(error){
        console.log("Error in opening page ins: "+error);
        reject(error);
    }
})
const scraper=(browser,url)=> new Promise(async (resolve, reject) => {
    try{
        let newpage= await browser.newPage();
        console.log("Opening page");
        await newpage.goto(url);
        console.log("Page opened"+url);
        await newpage.waitForSelector('#main');
        console.log("Page loaded");
        const scrapeData={}
        // lấy header
        const header = await newpage.$eval('header',(el)=>{
            return {
                title:el.querySelector('h1').innerText,
                description:el.querySelector('p').innerText
            }
        });
        scrapeData.header=header;
        // lấy thông tin link item  
        const detaillink= await newpage.$$eval('#left-col > section.section-post-listing > ul >li',els=>{
            detaillink = els.map(el=>{
                return   el.querySelector('.post-meta > h3 > a').href

            })
            return detaillink;
           
        })
        // console.log(detaillink);
     

     
        const scraperDetail= async (link) => new Promise(async (resolve, reject) =>{
            try {
                let pageDetail = await browser.newPage();
                await pageDetail.goto(link);
                console.log("Page opened"+link);
                await pageDetail.waitForSelector('#main');
                const detailData={};
                const images = await pageDetail.$$eval('#left-col >article >div.post-images >div >div.swiper-wrapper >div.swiper-slide',(els)=>{
                
        //     images = els.map(el=>{
        //         return el.querySelector('img').src;
        //     })
        //     return images;
        //   })
        const media = els.map(el => {
            const img = el.querySelector('img');
            const iframe = el.querySelector('iframe');
        
            if (img) {
              return { type: 'image', src: img.src };
            } else if (iframe) {
              return { type: 'video', src: iframe.src };
            }
            return null;
          }).filter(item => item !== null);  // Loại bỏ các phần tử không chứa img hoặc iframe
        
          return media;
        });
        // console.log(images);
                // console.log(images);
                detailData.images=images;
                // lấy header detail
                const headerdata= await pageDetail.$eval('header.page-header',(el)=>{
                    return {
                        title:el.querySelector('h1 > a').innerText,
                        star:el.querySelector('h1 > span').className.replace(/^\D+/g, ''),
                        // class:{
                        //     content: el.querySelector('p').innerText,
                        //     classType:el.querySelector('p > a > strong').innerText


                        // },
                        address:el.querySelector('address').innerText,
                        attribute:{
                            price:el.querySelector('div.post-attributes >.price > span').innerText,
                            acreage:el.querySelector('div.post-attributes >.acreage > span').innerText,
                            published:el.querySelector('div.post-attributes >.published > span').innerText,
                            hashtag:el.querySelector('div.post-attributes >.hashtag > span').innerText,
                              }

                    }
                })
                // console.log(headerdata);
                detailData.headerdata=headerdata;
                // lấy thông tin mô tả
                const mainContent={};
                const mainContentHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-main-content ',(el)=>{
                return   el.querySelector('div.section-header >h2').innerText
            
                }
                );
                const mainContentBody=await pageDetail.$$eval('#left-col > article.the-post > section.post-main-content div.section-content>p',(els)=>{
                 mainContentBody = els.map(el=>{
                    return el.innerText;
                })
                return mainContentBody;
                })
                detailData.mainContent={
                    header:mainContentHeader,
                   content: mainContentBody
                }
                 // console.log(mainContentHeader);
                // console.log(mainContentBody)
                //đặc điểm tin đăng 
                const overViewHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-overview ',(el)=>{
                    return   el.querySelector('div.section-header >h3').innerText
                
                    }
                    );
                const overViewBody=await pageDetail.$$eval('#left-col > article.the-post > section.post-overview div.section-content>table.table>tbody>tr',(els)=>{
                    overViewBody = els.map(el=>{
                        return {
                            name:el.querySelector('td:first-child').innerText,
                            value:el.querySelector('td:last-child').innerText
                   }})
                   return overViewBody;
                   })
                //    console.log(overViewHeader);
                //      console.log(overViewBody);
          detailData.overView={
                header:overViewHeader,
                content:overViewBody
            }
            //thông tin liên hệ
            const contactHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-contact ',(el)=>{
                return   el.querySelector('div.section-header >h3').innerText
            
                })
            const contactBody=await pageDetail.$$eval('#left-col > article.the-post > section.post-contact div.section-content>table.table>tbody>tr',(els)=>
            {
                contactBody = els.map(el=>{
                    return {
                        name:el.querySelector('td:first-child').innerText,
                        value:el.querySelector('td:last-child').innerText
                }})
                return contactBody;
            })
            detailData.contact={
                header:contactHeader,
                content:contactBody
            }
            // console.log(detailData.contact);

                await pageDetail.close();
                console.log("Page closed"+link);
                resolve(detailData);
            } catch (error) {
                console.log("Lấy data details lỗi :" + error);
                 reject(error);
            }
        });
        const details=[];
        let i=0;
        for (let link of detaillink){
        const detail=   await scraperDetail(link);
        console.log("web  " +i +" thông tin : "+detail.headerdata.title);
        i++;
       
        details.push(detail);
        if(i==10) break;
        }
        scrapeData.body=details;
    

        await browser.close();
        // console.log(scrapeData.header);
        // console.log(scrapeData.body);
        console.log("Page closed"+url);
        resolve(scrapeData)

    }
    catch(error){
        console.log("Error in opening page scraper: "+error);
        reject(error);
    }
});
module.exports = {scarpeCategory,scraper,scaperins};
// function writeToFile(filename, content) {
//     fs.writeFile(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
//       if (err) {
//         console.error('Lỗi khi ghi file:', err);
//       } else {
//         console.log('Ghi file thành công!');
//       }
//     });
//   }
  
//   // Gọi hàm để ghi dữ liệu vào file 'output.json'
//   writeToFile('output.json', data);