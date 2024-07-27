import { generateData } from './src/utils/datagenration.js';
import { removeKeys } from './src/utils/datamanupulation.js';
import { loadData, performQuery } from './src/utils/dataquery.js';

const performAction = async () => {
  try {
    console.time('Total execution time');

    console.time('Data generation');
    await generateData(1000000); // 1 million records
    console.timeEnd('Data generation');

    console.time('Key removal');
    await removeKeys("data.json", "data2.json", [35], "age");
    console.timeEnd('Key removal');

    console.time('Data loading');
    await loadData();
    console.timeEnd('Data loading');

    console.time('Query execution');
    const result = await performQuery("age", 18);
    console.timeEnd('Query execution');

    console.log('Query result:', result);

    console.timeEnd('Total execution time');
  } catch (error) {
    console.error('An error occurred during execution:', error);
  }
};

performAction().then(() => console.log('All processes completed'));
