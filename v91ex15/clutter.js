const { dir } = require("console");
const fs = require("fs");
const path = require("path");

const dirName = "./download"
const setOfAllowedFile = new Set(["mp3","jpg","txt","png","pdf","zip"]);

async function listFilesAndDirectories(directoryPath) {
    let arrayOfFiles = [];
    let arrayOfDirs = [];
    let files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        let isDirectory=fs.lstatSync(directoryPath+"/"+file).isDirectory();
        if(isDirectory){
            arrayOfDirs.push(file);
        }else{
            arrayOfFiles.push(file);
        }
    })
    return [arrayOfDirs,arrayOfFiles];
}

async function sortFilesInDir(dirName) {
    let [allDirs,allFiles] = await listFilesAndDirectories(dirName);
    allFiles.forEach(file => {
        let ext= path.extname(file).slice(1);
        if(setOfAllowedFile.has(ext)){
            let subDir = dirName+"/"+ext;
            let srcFile = dirName+"/"+file;
            let desFile = dirName+"/"+ext+"/"+file;
            if(!fs.existsSync(subDir)){
                fs.mkdirSync(subDir);
            }
            fs.copyFileSync(srcFile,desFile);
            fs.unlinkSync(srcFile);
        }
    });

    allDirs.forEach(dir => {
        if(!setOfAllowedFile.has(dir)){
            sortFilesInDir(dirName+"/"+dir);
        }
    });
}


(function () {
    sortFilesInDir(dirName);
})();