export class IllegalArgumentException extends Error {
    constructor(i: number, length: number){
        super(`Index '${i}' is not between 0 and ${length}`);
    }
}