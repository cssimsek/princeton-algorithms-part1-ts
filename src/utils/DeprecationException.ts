export class DeprecatedException extends Error {
    constructor(that: Function, url: URL){
        super(`The method '${that.name}' is Deprecated according to ${url}`);
    }
}