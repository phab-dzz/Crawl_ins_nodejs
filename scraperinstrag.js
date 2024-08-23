  
//cào ins
const scaperins = async (browser,url) => new Promise(async (resolve, reject) =>{
    try{
        let page = await browser.newPage();
        console.log("Opening page");

        await page.goto(url);
        console.log("Page opened"+url);
        // await page.waitForSelector('body._ar45');
        console.log("Page loaded");
        // const imagess = await pageDetail.$eval('div._aagv',(els)=>{
                
        //         imagess = els.map(el=>{
        //             return el.querySelector('img').src;
        //         })
        //         return imagess;
        //       })
            //   const boundingBoxElement = await page.evaluate(async () => {

            //     // List bài post chính là danh sách children của wrapper aghb5jc5 như đã nói
            //     const listData = document.querySelectorAll('._aagv>img')[0].children
            //     return 
                
            // })
            console.log(imagess);
   await page.close();
   resolve()
    }catch(error){
        console.log("Error in opening page ins: "+error);
        reject(error);
    }
})
module.exports = scaperins;