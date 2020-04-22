/**
 * @param someString The string to be split
 * @param delimeter Delimiter to split on
 * @param radix Optional radix for parseInt operation, defaults to 10
 */

export default function splitAndParseInt(someString: string, delimiter: string, radix = 10): number[] {
    const splitStringArray = someString.split(delimiter);
    return splitStringArray.map((el)=>{
        return parseInt(el,radix);
    }); 
}