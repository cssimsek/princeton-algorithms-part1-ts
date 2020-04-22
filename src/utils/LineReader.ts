import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

/**
 * {@link LineReader} is a wrapper of the readLine module
 * 
 * {@link LineReader.createReadStream} Creates a ReadStream of the file declared on contrcution
 * 
 * {@link LineReader.createReadLineInterface} Returns a readLine.Interface which take the created ReadStream as input
 */

export class LineReader {

    private filePath: string;

    /**
     * @param _filePath File path to be comsumed by {@link createReadStream} 
     */
    constructor(_filePath: string = ''){
        this.filePath = _filePath;
    }

    private createReadStream(): fs.ReadStream {
        if(this.filePath){
            return fs.createReadStream(path.resolve(this.filePath),'utf8');
        }else{
            throw new Error('A file name was not provided at construction time');
        }
        
    }

    createReadLineInterface(readlineOptions?: readline.ReadLineOptions): readline.Interface {
        if(readlineOptions){
            return readline.createInterface(readlineOptions);
        }
        const rs = this.createReadStream();
        return readline.createInterface({'input': rs});

    }

}