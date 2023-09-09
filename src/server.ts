//import Jimp from 'jimp';
import Tesseract from 'tesseract.js';
// import { createWorker } from 'tesseract.js';

// const w = await createWorker({
//     logger: m => console.log(m),
// });
const lang = 'eng+por';

// const fun = async (request, env) => {

// }
const u = `https://user-images.githubusercontent.com/1809086/262851444-681aeac1-0c80-4995-ab78-ad075d7bd04e.png`;

async function getImageStream(){
    const blobResponse = await fetch(u);
    return await blobResponse.blob();    
}

export default {
    // fetch: fun
    fetch: async () => {
        // return new Response('hello');

        let result = {};
        
        const imageName = new URL(u).pathname.split('/').pop();
        const imgPath = `./${imageName}.png`;
        const blobStream = await getImageStream();
        
        // const image = await Jimp.read(u);

        

        // image.crop(21, 7, 36, 12);
        // image.contrast(0.2)
        // image.scale(100)

        // for (var x = 0; x < image.bitmap.width; x++) {
        //     for (var y = 0; y < image.bitmap.height; y++) {
        //         let currentColor = image.getPixelColor(x, y);

        //         var rgb = Jimp.intToRGBA(currentColor);
        //         const min = 240;

        //         if (rgb.r + rgb.g + rgb.b > min) {
        //             let newVal = 255;
        //             image.setPixelColor(Jimp.rgbaToInt(newVal, newVal, newVal, newVal), x, y);
        //         }
        //     }
        // }
        // image.scale(0.2)
        // image.dither16();
        // image.write(imgPath);

        try {

            // await w.loadLanguage(lang);
            // await w.initialize(lang);
            // await w.setParameters({
            //     tessedit_char_whitelist: '0123456789',
            // });
        
            // const { data: { text } } = await w.recognize(blobStream);
            // console.log(text);
            // await w.terminate();

            const tsresult = await Tesseract.recognize(
                blobStream,
                //imgPath,
                'eng',
                { logger: m => console.log(m) }
            )
            const { text } = tsresult.data;
            result = {
                text
            };

        } catch (error) {
            result = error;
            // res.json({
            //     errorMessage: `an error occurred while recognizing the text using Tesseract`,
            //     innerError: error
            // });
        }
        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'text/html' }
        });
    }
}