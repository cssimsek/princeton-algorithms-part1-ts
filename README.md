# Sedgewick and Wayne's Algos in TypeScript
## Purpose
The purpose of this repository is to work through Robert Sedgewick and Kevin Wayne's classic course on Algorithms, referring to their content on [Coursera](https://www.coursera.org/learn/algorithms-part1), [The Book Site](https://algs4.cs.princeton.edu/), and the [Java Source Code](https://github.com/kevin-wayne/algs4).
## Language & Tools
My approach is to implement the Java classes in TypeScript (Visual Studio Code locally), generate documentation using [TypeDoc](http://typedoc.org/guides/doccomments/) and test implementations of the classes using Jest for TypeScript [ts-jest](https://github.com/kulshekhar/ts-jest).
## Initialisation
After you `git clone` and `npm install` you'll need to download the official test data files from https://algs4.cs.princeton.edu/code/algs4-data.zip and then create a json file named sample-data-definitions.json under [./src/sample-data/](./src/sample-data) with test file names and file paths:
```
{
    "tinyUF": "PARENT_DIRECTORY/algs4-data/tinyUF.txt",
    "mediumUF": "PARENT_DIRECTORY/algs4-data/mediumUF.txt",
    "largeUF": "PARENT_DIRECTORY/algs4-data/largeUF.txt"
}
```

To run the index.ts example implemtation use `ts-node index.ts`.
To run the tests run `npm run-script test`.
