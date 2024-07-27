import fs from 'fs/promises';

const removeKeys = async (inputFile, outputFile, keysToRemove, keyToCheck) => {
  try {
    const data = await fs.readFile(inputFile, 'utf-8');
    const items = JSON.parse(data);

    const filteredItems = items.filter(item => {
      const valueToCheck = item[keyToCheck];
      return !keysToRemove.includes(valueToCheck);
    });

    await fs.writeFile(outputFile, JSON.stringify(filteredItems, null, 2));
    
    console.log(`Data processing complete.
${filteredItems.length} items were kept and written to ${outputFile}.
${items.length - filteredItems.length} items were removed.`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

export { removeKeys };
