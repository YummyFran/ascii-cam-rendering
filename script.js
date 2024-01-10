const asciiFrame = document.getElementById("ascii")
const camera = document.getElementById("camera")
const canvas = document.getElementById("canvas")
const webcam = new Webcam(camera, "user", canvas)

let prev = 0
const updateFrame = (time) => {
    const diff = time - prev
    prev = time
    console.log(diff)
    
    displayYungPictureGamitCharacters(webcam.snap(), 420)
    requestAnimationFrame(updateFrame)
}


const displayYungPictureGamitCharacters = async (imagePath, width) => {
    try {
        const image = await Jimp.read(imagePath);
        const asciiChars = '@%#*+=-:. ';

        console.log(image)
    
        let asciiArt = '';
    
        image.resize(width, Jimp.AUTO);
        image.grayscale();

        asciiFrame.style.fontSize = `${parseInt(getComputedStyle(asciiFrame).width) / image.getWidth() * 1.5}px`
        for (let y = 0; y < image.getHeight(); y++) {
            for (let x = 0; x < image.getWidth(); x++) {
            const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
            const brightness = (r + g + b) / 3;
            const asciiIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            
            asciiArt += asciiChars.charAt(asciiIndex);
            }
            asciiArt += '\n';
        }
    
        asciiFrame.innerText = asciiArt;
    } 
    catch (error) {
        console.error('May error par, kung di mo alam bakit, eto:', error);
    }
}

webcam.start()
requestAnimationFrame(updateFrame)
//   displayYungPictureGamitCharacters('./angel.jpg', 420);