import Jimp from 'jimp';
// import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';

// const fun = async (request, env) => {

// }

export default {
    // fetch: fun
    fetch: async () => {
        // return new Response('hello');

        const u = `https://user-images.githubusercontent.com/1809086/262851444-681aeac1-0c80-4995-ab78-ad075d7bd04e.png`;
        let result = {};
        const image = await Jimp.read(u);

        const imageName = new URL(u).pathname.split('/').pop();
        image.crop(21, 7, 36, 12);
        image.contrast(0.2)
        image.scale(100)

        for (var x = 0; x < image.bitmap.width; x++) {
            for (var y = 0; y < image.bitmap.height; y++) {
                let currentColor = image.getPixelColor(x, y);

                var rgb = Jimp.intToRGBA(currentColor);
                const min = 240;

                if (rgb.r + rgb.g + rgb.b > min) {
                    let newVal = 255;
                    image.setPixelColor(Jimp.rgbaToInt(newVal, newVal, newVal, newVal), x, y);
                }
            }
        }
        const imgPath = `./${imageName}.png`;
        image.scale(0.2)
        image.dither16();
        image.write(imgPath);

        try {
            const tsresult = await Tesseract.recognize(
                imgPath,
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