import fs from 'fs';
import readline from 'readline';

const removeKeys = async (inputFile, outputFile, keysToRemove, keyToCheck) => {
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const lineReader = readline.createInterface({ input: readStream });

  let isFirstItem = true;
  let itemsKept = 0;
  let itemsRemoved = 0;

  writeStream.write('[');

  for await (const line of lineReader) {
    if (line === '[' || line === ']') continue;

    const item = JSON.parse(line.replace(/,$/, ''));
    const valueToCheck = item[keyToCheck];

    const shouldRemoveItem = Array.isArray(valueToCheck)
      ? valueToCheck.some(value => keysToRemove.includes(value))
      : keysToRemove.includes(valueToCheck);

    if (!shouldRemoveItem) {
      if (!isFirstItem) writeStream.write(',');
      writeStream.write(JSON.stringify(item));
      isFirstItem = false;
      itemsKept++;
    } else {
      itemsRemoved++;
    }
  }

  writeStream.write(']');
  writeStream.end();

  console.log(`Data processing complete.
${itemsKept} items were kept and written to ${outputFile}.
${itemsRemoved} items were removed.`);
};

export { removeKeys };