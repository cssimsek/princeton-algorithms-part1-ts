import { QuickFindUF } from './src/data-structures/disjoint-set/QuickFindUF';
import { LineReader } from './src/utils/LineReader';
import splitAndParseInt from './src/utils/splitAndParseInt';
//Synchronously import and serialize data file definition 
const sampleDataFiles = require('./src/sample-data/sample-data-definitions.json');

const lineReaderInstance = new LineReader(sampleDataFiles['mediumUF']).createReadLineInterface();

let iterationCounter = 0;
let myQF: QuickFindUF;
let nextPair: number[];

lineReaderInstance.on('line', (lineData: string) => {
    if (iterationCounter == 0) {
        myQF = new QuickFindUF(parseInt(lineData, 10));
    } else {
        nextPair = splitAndParseInt(lineData, ' ');
        console.log(`nextPair: [${nextPair}]`);
        let [p, q] = nextPair;
        if (myQF.find(p) != myQF.find(q)) {
            myQF.union(p, q);
        } else {
            console.log(`[${p}] and [${q}] are already connected`);
        }
    }
    console.log(`Current connected component count: ${myQF.getCount()}`);
    iterationCounter++;
});

lineReaderInstance.on('close', () => {
    console.log(`Final state of id[] array: ${myQF.toString()}`);
});

lineReaderInstance.on('error', console.error);