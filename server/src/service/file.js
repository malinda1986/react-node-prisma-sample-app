const fs = require('fs');
const saveFile = (file, fileName) => {
    const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const name = Date.now()+ '_' + fileName;
    return new Promise(resolve => {
        let path = __dirname.replace('server/src/service' , 'public/')
        fs.writeFile( path + name, base64Data, 'base64', function(err, result) {
            console.log(err)
            resolve(name)
        });
    });
}

module.exports = {
    saveFile
};