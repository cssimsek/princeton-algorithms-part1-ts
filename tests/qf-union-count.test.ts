import { QuickFindUF } from '../src/data-structures/disjoint-set/QuickFindUF';
require('../src/utils/JestGlobalsExtender');

const qfUF = new QuickFindUF(10);
//Store size after instantiation
const initialSize: number = qfUF.getCount();

//Count 'union' invocations
let unionInvocationCount = 0;
qfUF.union(3, 6), unionInvocationCount += 1;
qfUF.union(1, 6), unionInvocationCount += 1;

function generateRandOnetoTen(): number{
    return ((Math.floor(Math.random()*10)%10) + 1);
}


describe('Quick Find union operation decrements set (component) size', () => {
    
    //Calculate expected new size
    const expectedSetSize: number = initialSize - unionInvocationCount;
    //Generate random size not equal to expected size
    const randomNumber = Math.abs(generateRandOnetoTen() - expectedSetSize);
    
    test(`Set (component) size should not equal to ${randomNumber}`, () => {
        //Should fail for random number not equal to expectedSetSize
        expect(randomNumber).not.toEqual(expectedSetSize);
    });

    test(`Set(component) size should be equal to ${expectedSetSize}`, () => {
        //The result of count() after 2 union operations should equal 8
        expect(qfUF.getCount()).toEqual(expectedSetSize);
    });

});

describe('Quick Find validate method', () => {

    //pRandom greater than initialSize
    const pRandom =  generateRandOnetoTen() + initialSize;
    //qRandom less than initialSize
    const qRandom =  generateRandOnetoTen() - initialSize;
    
    //Calculate expected new size
    const expectedSetSize: number = initialSize - unionInvocationCount;
    //Valid random number
    const randomNumber = Math.abs(generateRandOnetoTen() - expectedSetSize);

    test(`Should throw IllegalArgumentException when p is ${pRandom}`,()=>{
        expect(qfUF.union(pRandom,randomNumber)).throwsIllegalArgumentException();
    });

    test(`Should throw IllegalArgumentException when q is ${qRandom}`,()=>{
        expect(qfUF.union(randomNumber,qRandom)).throwsIllegalArgumentException();
    });
    
});

describe('Quick Find connected method', () => {

    const pRandom = (Math.round((Math.random() * 10)))%10;
    const qRandom =  (Math.round((Math.random() * 10)))%10;

    const suppressFlag = false;

    test(`Should throw DeprecatedException if suppress flag is ${suppressFlag}`,()=>{
        expect(qfUF.connected(pRandom,qRandom,suppressFlag)).throwsDeprecatedException();
    });

    test(`Should not throw DeprecatedException if suppress flag is ${!suppressFlag}`,()=>{
        expect(qfUF.connected(pRandom,qRandom,!suppressFlag)).not.throwsDeprecatedException();
    });
    
});