import express from 'express'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use('/assets', express.static('./dist/assets'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})