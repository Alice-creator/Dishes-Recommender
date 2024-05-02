const fs = require('fs');
const path = require('path');

// function convertImageToBase64(filePath) {
//     // Read file from the filesystem
//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return;
//         }

//         // Convert image data to a base64 string
//         const base64Image = data.toString('base64');

//         // Display or return the base64 string
//         console.log('Base64 representation:', base64Image);
//     });
// }

// // Replace 'path/to/your/image.jpg' with the actual path to your image file
// // convertImageToBase64('D:/Project/Dishes_recommender/resources/images/eggplant.jpg');
// const temp = [1,2,23,34,57,8,758,678640]

// console.log(temp.toString('base64'))

async function counting() {
    // Use await with a Promise that resolves after 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('await 2 seconds');
  }
  
  counting().then(() => {
    console.log('abc xyz');
  });
  
  console.log('fdsfds');
  
// console.log('fdsfds')