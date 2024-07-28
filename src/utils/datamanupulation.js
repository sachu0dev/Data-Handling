import fs from 'fs';
import JSONStream from 'JSONStream';
import { Transform } from 'stream';

const removeKeys = async (inputFile, outputFile, keysToRemove, keyToCheck) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(outputFile);
    const parser = JSONStream.parse('*');
    
    let itemsKept = 0;
    let itemsRemoved = 0;
    let isFirstItem = true;

    writeStream.write('[\n');

    const filterStream = new Transform({
      objectMode: true,
      transform(item, encoding, callback) {
        const valueToCheck = item[keyToCheck];
        if (!keysToRemove.includes(valueToCheck)) {
          if (!isFirstItem) {
            this.push(',\n');
          } else {
            isFirstItem = false;
          }
          this.push(JSON.stringify(item, null, 2));
          itemsKept++;
        } else {
          itemsRemoved++;
        }
        callback();
      },
      flush(callback) {
        this.push('\n]');
        callback();
      }
    });

    readStream
      .pipe(parser)
      .pipe(filterStream)
      .pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`Data processing complete.
        ${itemsKept} items were kept and written to ${outputFile}.
        ${itemsRemoved} items were removed.`);
      resolve();
    });

    readStream.on('error', reject);
    writeStream.on('error', reject);
    parser.on('error', reject);
  });
};

export { removeKeys };