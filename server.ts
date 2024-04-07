import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.get('*', (_0, res) => {
    res.sendFile(path.join('dist', 'index.html'),{ root: '.' });
});

app.listen(PORT, () => {
    console.log(`My Chat listening on port ${PORT}!`);
});
