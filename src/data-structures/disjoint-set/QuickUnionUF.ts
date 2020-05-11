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
     * but `find` in the Java code. I'm naming it [[`findRoot`]] to capture both names. 
     * 
     * @param i `i` is the index of the component for which we want to find the root.
     */
    public findRoot(i: number): number {
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
     * Merges the tree containing component `p` 
     * with the tree containing component `q`. 
     * @param  p one component
     * @param  q the other component 
     * @throws IllegalArgumentException unless
     * ``` 
     * let n = this.parent.length;
     * !!((0 <= p < n) && (0 <= q < n));
     * ```
     * */
    public union(p: number, q: number): void {
        
    }

    public toString(): string {
        return JSON.stringify(this.parent);
    }


}