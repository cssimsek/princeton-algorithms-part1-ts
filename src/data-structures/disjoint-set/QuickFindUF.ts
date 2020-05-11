import { DeprecatedException } from '../../utils/DeprecationException';
import { IllegalArgumentException } from '../../utils/IllegalArgumentException';
import { URL } from 'url';

/**
 * @category Disjoint Set 
 */
export class QuickFindUF {

    private id: number[];
    constructor(n: number) {
        //Set id of each object to itself. N array accesses.
        this.id = Array.from({
            length: n
        }).map((el: any, index: number) => index);
    }

    /**
     *  @return The number of unique component sets in id[]
     */
    public getCount(): number {
        return new Set(this.id).size;
    }

    /**  
     * [[`connected`]] is **Deprecated** according to [official Java code](https://github.com/kevin-wayne/algs4/blob/master/src/main/java/edu/princeton/cs/algs4/QuickFindUF.java#L124)
     * 
     * Use [[`find`]] instead:
     * ```javascript 
     * QuickFindUF.find(p) === QuickFindUF.find(q);
     * ``` 
     * @param s  Set this optional flag to **true** in order to suppress Deprecation exception.
     */
    public connected(p: number, q: number, s? : boolean): boolean | DeprecatedException {
        if (!s) {
            /** 
            * Hacky exception handling approach to allow for test fulfillment based on error type checking
            * */
            try{ 
                throw new DeprecatedException(this.connected, new URL('https://github.com/kevin-wayne/algs4/blob/master/src/main/java/edu/princeton/cs/algs4/QuickFindUF.java#L124'));
            }catch(e){
                console.warn(e.stack)
                return e;
            }
        } else {
            return this.id[p] === this.id[q];
        }
    }

    /** 
     * @param i An element in [[`id`]]
     * @returns The returned number tells us which component the param **i** (item / object) belongs to
     */
    public find(i: number): number | IllegalArgumentException {
        /** 
         * Hacky exception handling approach to allow for test fulfillment based on error type checking
         * */
        try {
            this.validate(i);
        } catch (e) {
            //Print Error stack trace and return error
            console.warn(e.stack);
            return e;
        }
        
        return this.id[i];
    }

    /**
     * Validate that `i` is a valid index in the `id` array
     */
    public validate(i: number): boolean {
        const currentLength = this.id.length;
        if (i < 0 || i > currentLength) {
            //An instance of Exception as Flow Control. This follows the approach in the original Java code.
            throw new IllegalArgumentException(i, currentLength);
        } else {
            return true;
        }
    }

    public union(p: number, q: number): void | IllegalArgumentException {
        /** 
         * Hacky exception handling approach to allow for test fulfillment based on error type checking
         * */
        try {
            this.validate(p);
            this.validate(q);
        } catch (e) {
            //Print Error stack trace and return error
            console.warn(e.stack);
            return e;
        }

        const pId = this.id[p];
        const qId = this.id[q];

        //Return if 'p' and 'q' already in the same component.
        if (pId === qId) return;

        //Iterate over id[] setting the the component of those elements in component of 'p' to component of 'q'.
        for (let i = 0; i < this.id.length; i += 1) {
            if (this.id[i] === pId) {
                this.id[i] = qId;
            }
        }
    }

  
    public toString(): string {
        return JSON.stringify(this.id);
    }

}