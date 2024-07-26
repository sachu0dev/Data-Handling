import fs from 'fs';
import JSONStream from 'JSONStream';

const removeKeys = (inputFile, outputFile, keysToRemove, keyToCheck) => {
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const parser = JSONStream.parse('*');
  
  writeStream.write('[');
  
  let isFirst = true;
  let count = 0;
  let removedCount = 0;  
  
  parser.on('data', (item) => {
    const valueToCheck = item[keyToCheck];
    
    let shouldRemove = false;

    if (typeof valueToCheck === 'string') {
      const values = valueToCheck.split(' ');

      shouldRemove = keysToRemove.some(keyToRemove => {
        if (keyToRemove.includes(' ')) {
          return keyToRemove === valueToCheck; 
        } else {
          return values.includes(keyToRemove); 
        }
      });
    } else if (keysToRemove.includes(valueToCheck)) {
      shouldRemove = true; 
    }

    if (!shouldRemove) {
      if (!isFirst) {
        writeStream.write(',');
      }
      writeStream.write(JSON.stringify(item));
      isFirst = false;
      count++;
    } else {
      removedCount++;
    }
  });
  
  parser.on('end', () => {
    writeStream.write(']');
    writeStream.end();
    console.log(`Data manipulation complete. ${count} rows written to ${outputFile}. ${removedCount} rows removed.`);
  });
  
  readStream.pipe(parser);
};

export { removeKeys };
