import { DeprecatedException } from '../../utils/DeprecationException';
import { IllegalArgumentException } from '../../utils/IllegalArgumentException';
import { URL } from 'url';

/**
 * @category Disjoint Set 
 */
export class QuickUnionUF {

    /**
     * {@linkcode parent} is an int array where the value at index `i` denotes
     * the parent node of the component `i`. `i` parents itself if it is a root node.
     */
    private parent: number[];

    constructor(n: number){
         //Set id of each object to itself. N array accesses.
         this.parent = Array.from({
            length: n
        }).map((el: any, index: number) => index);
    }

    /**
     *  @return The number of unique component sets in id[]
     */
    public getCount(): number {
        return new Set(this.parent).size;
    }

     /**
     * {@link QuickUnionUF.findRoot} walks up the component tree until it finds and returns the root of the component at `i`
     * This method is named `root` in the slides which accompany the Coursera videos,
     * but `find` in the Java code. I'm naming it [[`findRoot`]] to encompass both names. 
     * 
     * @param i `i` is the index of the component for which we want to find the root.
     */
    public findRoot(i: number): number | IllegalArgumentException {

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

        while(i != this.parent[i]){
            i = this.parent[i];
        }
        return i;
    }

     /**
     * Validate that `i` is a valid index in the `parent` array
     */
    public validate(i: number): boolean {
        const currentLength = this.parent.length;
        if (i < 0 || i > currentLength) {
            //An instance of Exception as Flow Control. This follows the approach in the original Java code.
            throw new IllegalArgumentException(i, currentLength);
        } else {
            return true;
        }
    }

    /**  
     * [[`connected`]] is **Deprecated** according to [official Java code](https://github.com/kevin-wayne/algs4/blob/master/src/main/java/edu/princeton/cs/algs4/QuickUnionUF.java#L126)
     * 
     * Use two calls to [[`findRoot`]] instead:
     * ```javascript 
     * QuickFindUF.findRoot(p) === QuickFindUF.findRoot(q);
     * ``` 
     * @param s  Set this optional flag to **true** in order to suppress Deprecation exception.
     */
    public connected(p: number, q: number, s? : boolean): boolean | DeprecatedException {
        if (!s) {
            /** 
            * Hacky exception handling approach to allow for test fulfillment based on error type checking
            * */
            try{ 
                throw new DeprecatedException(this.connected, new URL('https://github.com/kevin-wayne/algs4/blob/master/src/main/java/edu/princeton/cs/algs4/QuickUnionUF.java#L126'));
            }catch(e){
                console.warn(e.stack)
                return e;
            }
        } else {
            return this.findRoot(p) === this.findRoot(q);
        }
    }

    /** 
     * Merges the set / node tree containing component `p` 
     * with the set / node tree containing component `q`. 
     * @param  p one component
     * @param  q the other component 
     * @throws IllegalArgumentException unless
     * ``` 
     * let n = this.parent.length;
     * !!((0 <= p < n) && (0 <= q < n));
     * ```
     * */
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

        const rootOfP = this.findRoot(p);
        const rootOfQ = this.findRoot(q);
        this.parent[rootOfP] = rootOfQ;
    }

    public toString(): string {
        return JSON.stringify(this.parent);
    }


}