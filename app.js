import express from 'express'
import { removeKeys } from './src/utils/datamanupulation.js';
import { generateData } from './src/utils/datagenration.js';
import { loadData, performQuery } from './src/utils/dataquery.js';


const app = express()
const port = 3000

app.get('/genrate', (req, res) => {
  const numRow = req.query.q;
  const start = performance.now();
  generateData(numRow);
  const end = performance.now();
  console.log(`Time taken: ${end - start}ms`);
  res.send(`Time taken: ${end - start}ms`)
})

app.get('/manupulate', (req, res) => {
  const start = performance.now();
  removeKeys("data.json", "data2.json", [35], "age");
  const end = performance.now();
  console.log(`Time taken: ${end - start}ms`);
  res.send(`Time taken: ${end - start}ms`)
})

app.get('/query', (req, res) => {
  const { key, value } = req.query;
  loadData().then(() => performQuery(key, value));
  res.send(`Data loaded and query executed`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
