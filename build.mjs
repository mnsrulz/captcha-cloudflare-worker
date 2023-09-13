import { createReadStream, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const fileStream = createReadStream('data/out.json');

const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
const lines = [];
for await (const line of rl) {
    lines.push(line);
}

writeFileSync('data/out-data.js',`export const data = [${lines.join(',')}]`);
