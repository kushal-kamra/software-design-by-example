import fs from "fs-extra";
import glob from "glob";
import path from "path";

const [readDir, dstDir] = process.argv.slice(2);

fs.readdir(readDir, (err, files) => {
    console.log('running callback for dir');
    if (err) {
        console.error(err);
    } else {
        for (const file of files) {
            console.log(file);
        }
    }

    console.log('last line of read dir program');
});

glob(`${readDir}/**/*.*`, { ignore: '*.json' }, (err, files) => {
    console.log('running callback for file match');
    if (err) {
        console.error(err);
    } else {
        // files = files.filter(file => !file.endsWith('.zip'));
        for (const file of files) {
            fs.stat(file, (err, stats) => {
                if (err) {
                    console.error(err);
                } else if (stats.isFile()) {
                    const dstName = file.replace(readDir, dstDir);
                    const dDir = path.dirname(dstName);
                    fs.ensureDir(dDir, (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            fs.copy(file, dstName, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                    })
                    console.log(file, dstName);
                }
            })
        }
    }
    console.log('last line of read glob program');
});

console.log('last line of program');